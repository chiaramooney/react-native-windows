/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 */

import React from 'react';
import {Text, TouchableHighlight, View, ViewStyle} from 'react-native';
import {Picker} from '@react-native-picker/picker';

class TabStopExample extends React.Component {
  public render() {
    const itemStyle: ViewStyle = {
      width: 120,
      height: 50,
      backgroundColor: 'aqua',
      justifyContent: 'center',
      alignItems: 'center',
    };
    const pickerStyle: ViewStyle = {width: 120, height: 50};

    return (
      <View>
        <Text>No tab index, this item will be tabbed to last</Text>
        <TouchableHighlight
          style={itemStyle}
          {...{
            focusable: true,
          }}
          onPress={() => {
            //onPress, even if empty, is required for TouchableWithoutFeedback to be focusable
          }}>
          <Text>tabIndex default</Text>
        </TouchableHighlight>

        <Text>
          These 3 items should tab in the order of first, last, middle:
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableHighlight
            style={itemStyle}
            onPress={() => {
              //onPress, even if empty, is required for Touchable components to be focusable
            }}
            {...{
              focusable: true,
              tabIndex: 1,
            }}>
            <Text>tabIndex 1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={itemStyle}
            onPress={() => {
              //onPress, even if empty, is required for Touchable components to be focusable
            }}
            {...{
              focusable: true,
              tabIndex: 3,
            }}>
            <Text>tabIndex 3</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={itemStyle}
            onPress={() => {
              //onPress, even if empty, is required for Touchable components to be focusable
            }}
            {...{
              focusable: true,
              tabIndex: 2,
            }}>
            <Text>tabIndex 2</Text>
          </TouchableHighlight>
        </View>

        <Text>
          Controls like Picker should also do the same tab in the order of
          first, last, middle:
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Picker style={pickerStyle} {...{tabIndex: 11}}>
            <Picker.Item label="tabIndex 11" />
          </Picker>
          <Picker style={pickerStyle} {...{tabIndex: 13}}>
            <Picker.Item label="tabIndex 13" />
          </Picker>
          <Picker style={pickerStyle} {...{tabIndex: 12}}>
            <Picker.Item label="tabIndex 12" />
          </Picker>
        </View>
      </View>
    );
  }
}

export const displayName = (_undefined?: string) => {};
export const title = 'Keyboard';
export const description = 'Usage of keyboard properties.';
export const examples = [
  {
    title: 'Tabstops',
    render: function () {
      return <TabStopExample />;
    },
  },
];
