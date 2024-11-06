import React from 'react';
import {Code} from './Code';
import {StyleSheet, PlatformColor, Text, View} from 'react-native';
//import {CopyToClipboardButton} from './CopyToClipboard';
//import {useTheme} from '@react-navigation/native';

const createStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      marginTop: 30,
      marginBottom: 10,
      fontSize: 20,
      color: '#505050',
    },
    box: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e6e6e6',
    },
    exampleContainer: {
      padding: 15,
      backgroundColor: '#eeeeee',
    },
    codeContainer: {
      borderWidth: 0,
      borderTopWidth: 1,
      borderColor: '#e6e6e6',
      padding: 12,
      backgroundColor: '#fdfdfd',
    },
  });

export function Example(props: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  //const {colors} = useTheme();
  const colors = {};
  const styles = createStyles(colors);
  return (
    <View>
      <Text accessibilityRole={'header'} style={styles.title}>
        {props.title}
      </Text>
      {props.code ? (
        <View style={styles.box}>
          <View style={styles.exampleContainer}>{props.children}</View>
          <View
            style={styles.codeContainer}
            accessible={true}
            accessibilityRole="none"
            accessibilityLabel="Source code">
            <Code>{props.code}</Code>
            <View style={{position: 'absolute', right: 12, top: 12}}>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.box}>
          <View style={styles.exampleContainer}>{props.children}</View>
        </View>
      )}
    </View>
  );
}
