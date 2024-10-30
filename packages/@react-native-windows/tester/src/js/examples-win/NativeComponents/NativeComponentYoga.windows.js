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
import {Text, View} from 'react-native';
import CustomXamlComponentWithYogaLayout from './CustomXamlComponentWithYogaLayoutNativeComponent';
import XamlCalendarView from './XamlCalendarViewNativeComponent';

const NativeComponentWithYogaExample = () => {
  let [log, setLog] = useState('');
  return (
    <View
      style={{
        borderRadius: 0,
        margin: 10,
        borderWidth: 2,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 5,
      }}>
      <View style={{width: 400, height: 400, backgroundColor: 'green'}} />
      <Text style={{color: 'red'}}>{log}</Text>
      <CustomXamlComponentWithYogaLayout
        label="This is a Xaml Button set to ellipisify on truncation"
        style={{flex: 1, minWidth: 400}}
        onMyEvent={(arg) => {}}
      />
      
      <XamlCalendarView
      style={{flex: 1, minWidth: 400}}
      />
      
      <View style={{width: 400, height: 400, backgroundColor: 'green'}} />

    </View>
  );
};

exports.displayName = 'NativeFabricComponentYoga';
exports.framework = 'React';
exports.category = 'UI';
exports.title = 'Fabric Native Component Yoga -- and a CalendarView';
//exports.documentationURL = 'https://reactnative.dev/docs/button';
exports.description =
  'Sample Fabric Native Component that places native XAML inside a container sized by yoga';

exports.examples = [
  {
    title: 'Native Component',
    render: function (): React.Node {
      return <NativeComponentWithYogaExample />;
    },
  },
];
