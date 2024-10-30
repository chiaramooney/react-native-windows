/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import CustomXamlComponentWithYogaLayout from './CustomXamlComponentWithYogaLayoutNativeComponent';
import XamlCalendarView from './XamlCalendarViewNativeComponent';

const XamlContentExample = () => {
  let [log, setLog] = useState('');

  let colorPickerXaml = '<ColorPicker ColorSpectrumShape="Box" IsMoreButtonVisible="False" IsColorSliderVisible="True" IsColorChannelTextInputVisible="True" IsHexInputVisible="True" IsAlphaEnabled="False" IsAlphaSliderVisible="True" IsAlphaTextInputVisible="True" />'

  return (
    <ScrollView>
    <View
      style={{
        borderRadius: 0,
        margin: 10,
        flexDirection: 'column',
        gap: 5,
      }}>

      <Text>Xaml CalendarView control:</Text>
      <XamlCalendarView
      style={{flex: 1, width: 400, height: 400, minWidth: 400, minHeight: 400}}
      />      

      <Text>Xaml ColorPicker control:</Text>
      <CustomXamlComponentWithYogaLayout
        xamlString={colorPickerXaml}
        style={{flex: 1, width: 400, height: 400, minWidth: 400, minHeight: 400}}
        onMyEvent={(arg) => {}}
      />

    </View>
    </ScrollView>
  );
};

exports.displayName = 'XamlContent';
exports.framework = 'React';
exports.category = 'UI';
exports.title = 'Xaml content in a React Native app';
//exports.documentationURL = 'https://reactnative.dev/docs/button';
exports.description =
  'Components implemented using Xaml';

exports.examples = [
  {
    title: 'Native Components using Xaml',
    render: function (): React.Node {
      return <XamlContentExample />;
    },
  },
];
