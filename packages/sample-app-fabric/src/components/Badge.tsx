import React from 'react';
import {StyleSheet, View, Text, OpaqueColorValue} from 'react-native';
//import {SymbolIcon} from 'react-native-xaml';

const styles = StyleSheet.create({
  badgeContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '400',
    paddingRight: 4,
  },
});

export function Badge(props: {
  badgeColor: any;
  textColor: string | OpaqueColorValue;
  badgeTitle: string;
  icon: number;
  description: string;
}) {
  return (
    <View
      style={[styles.badgeContainer, {backgroundColor: props.badgeColor}]}
      tooltip={props.description}>
      <Text style={[styles.badgeText, {color: props.textColor}]}>
        {props.badgeTitle}
      </Text>
    </View>
  );
}
