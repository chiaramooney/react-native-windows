import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  PlatformColor,
  Pressable,
  useColorScheme,
} from 'react-native';
//import {useNavigation, DrawerActions} from '@react-navigation/native';
import AppContext from './../AppContext';

const createStyles = (colorScheme, isBackPressing) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      backgroundColor: '#f9f9f9',
    },
    navBar: {
      backgroundColor: '#f3f3f3',
      width: 48,
      height: '100%',
      paddingBottom: 20,
    },
    navItem: {
      flexGrow: 1,
      flexShrink: 1,
      height: '100%',
      alignSelf: 'stretch',
      borderTopLeftRadius: 8,
      borderColor: '#eaeaea',
      borderLeftWidth: 1,
    },
    insetNavItem: {
      paddingLeft: 36,
    },
    menu: {
      margin: 5,
      height: 34,
      width: 38,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 16,
      color: PlatformColor('TextControlForeground'),
    },
    backIcon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 16,
      color: isBackPressing? '#585858' : PlatformColor('TextControlForeground'),
    },
    back: {
      marginTop: 15,
    }
  });

type ScreenWrapperProps = React.PropsWithChildren<{
  doNotInset?: boolean;
}>;
export function ScreenWrapper({
  children,
  doNotInset,
}: ScreenWrapperProps): JSX.Element {
  //const navigation = useNavigation();
  //const colorScheme = useColorScheme();
  const colorScheme = {};
  const [isBackPressing, setIsBackPressing] = React.useState(false);
  const styles = createStyles(colorScheme, isBackPressing);
  const { showHome, setShowHome } = React.useContext(AppContext);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Navigation bar"
        // requires react-native-gesture-handler to be imported in order to pass testing.
        // blocked by #125
        /*accessibilityState={{
          expanded: useIsDrawerOpen(),
        }}*/
        style={styles.navBar}
        onPress={() => {
          //navigation.dispatch(DrawerActions.openDrawer());
        }}>
        <View>
          <TouchableHighlight
            accessibilityRole="button"
            accessibilityLabel="Navigation bar hamburger icon"
            {...{tooltip: 'Expand Menu'}}
            // requires react-native-gesture-handler to be imported in order to pass testing.
            // blocked by #125
            //accessibilityState={{expanded: useIsDrawerOpen()}}
            style={styles.menu}
            //onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            activeOpacity={0.5783}
            underlayColor="rgba(0, 0, 0, 0.0241);">
            <Text style={styles.icon}>&#xE700;</Text>
          </TouchableHighlight>
        </View>
      </Pressable>
      <View style={[styles.navItem, doNotInset ? {} : styles.insetNavItem]}>
        {!showHome ? (<Pressable style={styles.back} onPress={()=>{setShowHome(true)}} onPressIn={() => setIsBackPressing(true)} onPressOut={() => setIsBackPressing(false)}>
          <Text style={styles.backIcon}>&#xE72B;</Text>
        </Pressable>) : <View/>}
        {children}
      </View>
    </View>
  );
}
