/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import XamlCalendarView from './XamlCalendarViewNativeComponent';


/*

type NativeProps = $ReadOnly<{|
  ...ViewProps,

  // Props
  label: string,

  // Events
  onMyEvent?: ?DirectEventHandler<MyEventEvent>,
|}>;

type ComponentType = HostComponent<NativeProps>;
*/


/*
function componentHasNativeconfig(name: string) {
  return !(global as unknown as {RN$Bridgeless:boolean}).RN$Bridgeless && name !== 'CustomXamlComponentWithNativeLayout' && name !== 'CustomXamlComponentWithYogaLayout' && name !== 'XamlCalendarView'
}

const nativeComponentRegistry = require('react-native/Libraries/NativeComponent/NativeComponentRegistry');
nativeComponentRegistry.setRuntimeConfigProvider((name: string) => {
  return {
    native: componentHasNativeconfig(name), // The fabric native component test has no viewmanager to get native config from
    strict: false,
    verify: componentHasNativeconfig(name),
  };
});
*/


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  
//          <XamlCalendarView style={{flex: 1, width: 400, height: 400, minWidth: 400, minHeight: 400}} />      

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits, it's fun....!!!
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Here's a test..." >

          </Section>
          <View style={{
            flexDirection: 'column'
            }}>
            <XamlCalendarView style={{flex: 1, width: 400, height: 400, minWidth: 400, minHeight: 400}}  />
          </View>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
