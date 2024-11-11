// SampleAppFabric.cpp : Defines the entry point for the application.
//

#include "pch.h"
#include "SampleAppFabric.h"

#include "AutolinkedNativeModules.g.h"

#include "NativeModules.h"

#include <winrt/Microsoft.UI.Xaml.Controls.h>
#include <winrt/Microsoft.UI.Xaml.Hosting.h>
#include <winrt/Microsoft.UI.Xaml.Media.h>
#include <winrt/Windows.UI.h>
#include <winrt/Microsoft.UI.Xaml.h> // IMPORT WINUI

#include <dcomp.h>

#include "App.xaml.h"

REACT_STRUCT(CustomXamlComponentProps)
struct CustomXamlComponentProps
    : winrt::implements<CustomXamlComponentProps, winrt::Microsoft::ReactNative::IComponentProps> {
  CustomXamlComponentProps(
      winrt::Microsoft::ReactNative::ViewProps props,
      const winrt::Microsoft::ReactNative::IComponentProps &cloneFrom)
      : ViewProps(props) {
    if (cloneFrom) {
      auto cloneFromProps = cloneFrom.as<CustomXamlComponentProps>();
    }
  }

  void SetProp(uint32_t hash, winrt::hstring propName, winrt::Microsoft::ReactNative::IJSValueReader value) noexcept {
    winrt::Microsoft::ReactNative::ReadProp(hash, propName, value, *this);
  }

  REACT_FIELD(label);
  winrt::hstring label;

  REACT_FIELD(xamlString);
  winrt::hstring xamlString;

  const winrt::Microsoft::ReactNative::ViewProps ViewProps;
};

struct XamlCalendarComponent : winrt::implements<XamlCalendarComponent, winrt::IInspectable> {
  void Initialize(const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView) {
    m_xamlIsland = winrt::Microsoft::UI::Xaml::XamlIsland{};

    winrt::Microsoft::UI::Xaml::Controls::CalendarView cv{}; // INSTANTIATE WINUI CALENDARVIEW CONTROL
    winrt::Microsoft::UI::Xaml::Media::ScaleTransform scaleTransform{};
    scaleTransform.ScaleX(1.5f);
    scaleTransform.ScaleY(1.5f);
    cv.RenderTransform(scaleTransform);
    m_xamlIsland.Content(cv);
    islandView.Connect(m_xamlIsland.ContentIsland());
  }

  void PropsChanged(
      const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView & /*islandView*/,
      const winrt::Microsoft::ReactNative::IComponentProps & /*newProps*/,
      const winrt::Microsoft::ReactNative::IComponentProps & /*oldProps*/) {}

  void FinalizeUpdates() noexcept {}

  static void ConfigureBuilderForCustomComponent(
      winrt::Microsoft::ReactNative::IReactViewComponentBuilder const &builder) {
    builder.SetCreateProps([](winrt::Microsoft::ReactNative::ViewProps props,
                              const winrt::Microsoft::ReactNative::IComponentProps &cloneFrom) noexcept {
      return winrt::make<CustomXamlComponentProps>(props, cloneFrom);
    });

    builder.SetFinalizeUpdateHandler([](const winrt::Microsoft::ReactNative::ComponentView &source,
                                        winrt::Microsoft::ReactNative::ComponentViewUpdateMask /*mask*/) {
      auto userData = source.UserData().as<XamlCalendarComponent>();
      userData->FinalizeUpdates();
    });

    auto compBuilder = builder.as<winrt::Microsoft::ReactNative::Composition::IReactCompositionViewComponentBuilder>();

    compBuilder.SetContentIslandComponentViewInitializer(
        [](const winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView &islandView) noexcept {
          auto userData = winrt::make_self<XamlCalendarComponent>();
          userData->Initialize(islandView);
          islandView.UserData(*userData);

          islandView.Destroying([](const winrt::IInspectable &sender, const winrt::IInspectable & /*args*/) {
            auto senderIslandView = sender.as<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView>();
            auto userData = senderIslandView.UserData().as<XamlCalendarComponent>();
            userData->m_xamlIsland.Close();
          });
        });

    builder.SetUpdateEventEmitterHandler([](const winrt::Microsoft::ReactNative::ComponentView &source,
                                            const winrt::Microsoft::ReactNative::EventEmitter &eventEmitter) {
      auto senderIslandView = source.as<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView>();
      auto userData = senderIslandView.UserData().as<XamlCalendarComponent>();
    });

    builder.SetUpdatePropsHandler([](const winrt::Microsoft::ReactNative::ComponentView &source,
                                     const winrt::Microsoft::ReactNative::IComponentProps &newProps,
                                     const winrt::Microsoft::ReactNative::IComponentProps &oldProps) {
      auto senderIslandView = source.as<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView>();
      auto userData = senderIslandView.UserData().as<XamlCalendarComponent>();
      userData->PropsChanged(senderIslandView, newProps, oldProps);
    });

    builder.SetUpdateStateHandler([](const winrt::Microsoft::ReactNative::ComponentView &source,
                                     const winrt::Microsoft::ReactNative::IComponentState &newState) {
      auto senderIslandView = source.as<winrt::Microsoft::ReactNative::Composition::ContentIslandComponentView>();
      auto userData = senderIslandView.UserData().as<XamlCalendarComponent>();
      userData->m_state = newState;
    });
  }

 private:
  winrt::Microsoft::UI::Xaml::Controls::TextBlock m_buttonLabelTextBlock{nullptr};
  winrt::Microsoft::ReactNative::IComponentState m_state;
  winrt::Microsoft::UI::Xaml::XamlIsland m_xamlIsland{nullptr};
};

// A PackageProvider containing any turbo modules you define within this app project
struct CompReactPackageProvider
    : winrt::implements<CompReactPackageProvider, winrt::Microsoft::ReactNative::IReactPackageProvider> {
 public: // IReactPackageProvider
  void CreatePackage(winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder) noexcept {
    AddAttributedModules(packageBuilder, true);

    packageBuilder.as<winrt::Microsoft::ReactNative::IReactPackageBuilderFabric>().AddViewComponent(
        L"XamlCalendarView", [](winrt::Microsoft::ReactNative::IReactViewComponentBuilder const &builder) noexcept {
          XamlCalendarComponent::ConfigureBuilderForCustomComponent(builder);
        });
  }
};

// The entry point of the Win32 application
_Use_decl_annotations_ int CALLBACK WinMain(HINSTANCE instance, HINSTANCE, PSTR /* commandLine */, int showCmd) {
  // Initialize WinRT
  winrt::init_apartment(winrt::apartment_type::single_threaded);

  // Enable per monitor DPI scaling
  SetProcessDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);

  // Find the path hosting the app exe file
  WCHAR appDirectory[MAX_PATH];
  GetModuleFileNameW(NULL, appDirectory, MAX_PATH);
  PathCchRemoveFileSpec(appDirectory, MAX_PATH);

  // Create a ReactNativeWin32App with the ReactNativeAppBuilder
  winrt::Microsoft::ReactNative::ReactNativeAppBuilder builder;

  auto dqc = winrt::Microsoft::UI::Dispatching::DispatcherQueueController::CreateOnCurrentThread();

  auto xamlApp{winrt::make<winrt::SampleAppFabric::implementation::App>()};
  auto compositor = winrt::Microsoft::UI::Xaml::Media::CompositionTarget::GetCompositorForCurrentThread();
  builder.SetDispatcherQueueController(dqc);
  builder.SetCompositor(compositor);

  auto timer = dqc.DispatcherQueue().CreateTimer();
  timer.Interval(std::chrono::milliseconds(16));
  timer.Tick([compositor](auto &&, auto &&) {
    auto dcompDevice = compositor.as<IDCompositionDevice>();
    dcompDevice->Commit();
  });
  timer.Start();

  auto reactNativeWin32App{builder.Build()};

  // Configure the initial InstanceSettings for the app's ReactNativeHost
  auto settings{reactNativeWin32App.ReactNativeHost().InstanceSettings()};
  // Register any autolinked native modules
  RegisterAutolinkedNativeModulePackages(settings.PackageProviders());
  // Register any native modules defined within this app project
  settings.PackageProviders().Append(winrt::make<CompReactPackageProvider>());

#if BUNDLE
  // Load the JS bundle from a file (not Metro):
  // Set the path (on disk) where the .bundle file is located
  settings.BundleRootPath(std::wstring(L"file://").append(appDirectory).append(L"\\Bundle\\").c_str());
  // Set the name of the bundle file (without the .bundle extension)
  settings.JavaScriptBundleFile(L"index.windows");
  // Disable hot reload
  settings.UseFastRefresh(false);
#else
  // Load the JS bundle from Metro
  settings.JavaScriptBundleFile(L"index");
  // Enable hot reload
  settings.UseFastRefresh(true);
#endif
#if _DEBUG
  // For Debug builds
  // Enable Direct Debugging of JS
  settings.UseDirectDebugger(true);
  // Enable the Developer Menu
  settings.UseDeveloperSupport(true);
#else
  // For Release builds:
  // Disable Direct Debugging of JS
  settings.UseDirectDebugger(false);
  // Disable the Developer Menu
  settings.UseDeveloperSupport(false);
#endif

  // Get the AppWindow so we can configure its initial title and size
  auto appWindow{reactNativeWin32App.AppWindow()};
  appWindow.Title(L"React Native Gallery");
  appWindow.Resize({1000, 1000});
  //appWindow.SetIcon("C:/Users/chiaramooney/react-native-windows/packages/sample-app-fabric/windows/SampleAppFabric.Package/Images/Square150x150Logo.scale-200.ico");

  // Get the ReactViewOptions so we can set the initial RN component to load
  auto viewOptions{reactNativeWin32App.ReactViewOptions()};
  viewOptions.ComponentName(L"sample_app_fabric");

  // Start the app
  reactNativeWin32App.Start();
}
