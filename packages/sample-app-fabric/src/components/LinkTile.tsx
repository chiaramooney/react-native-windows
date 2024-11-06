import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//import {useTheme} from '@react-navigation/native';
//import {HyperlinkButton} from 'react-native-xaml';

const createStyles = (colors: any) =>
  StyleSheet.create({
    hyperlinkTile: {
      marginTop: 30,
      marginBottom: 10,
      marginRight: 30,
      alignItems: 'flex-start',
    },
    hyperlinkTileTitle: {
      marginBottom: 10,
      fontSize: 20,
      color: '#505050',
    },
  });

export function LinkTile(props: {
  title: string;
  links: {label: string; url: string}[];
}) {
  //const {colors} = useTheme();
  const colors = {};
  const styles = createStyles(colors);
  return (
    <View style={styles.hyperlinkTile}>
      <Text accessibilityRole="header" style={styles.hyperlinkTileTitle}>
        {props.title}
      </Text>
      {props.links.map((hyp) => (
        <Text style={{color: '#003e92', margin: 5}}>{hyp.label}</Text>
      ))}
    </View>
  );
}
