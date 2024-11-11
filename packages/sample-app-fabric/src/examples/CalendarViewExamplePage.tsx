'use strict';
import React, {useState} from 'react';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {Example} from '../components/Example';
import {Page} from '../components/Page';
import {StyleSheet, Text, View} from 'react-native';
import XamlCalendarView from '../XamlCalendarViewNativeComponent';

export const CalendarViewExamplePage: React.FunctionComponent<{}> = () => {
  const [date1] = useState(new Date());
  const [date2] = useState(new Date());
  const styles = createStyles();

  const textExample1 =
    '<XamlCalendarView /> ';

  return (
    <Page
      title="CalendarView"
      description={
        'CalendarView shows a larger view for showing and selecting dates. DatePicker by contrast has a compact view with inline selection.'
      }
      wrappedNativeControl={{
        control: 'CalendarDatePicker',
        url: 'https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.calendardatepicker?view=winrt-19041',
      }}
      componentType="Community"
      pageCodeUrl="https://github.com/microsoft/react-native-gallery/blob/main/src/examples/DatePickerExamplePage.tsx"
      documentation={[
        {
          label: 'DateTimePicker',
          url: 'https://github.com/react-native-datetimepicker/datetimepicker',
        },
      ]}>
      <Example title="A basic calendar view." code={textExample1}>
            <XamlCalendarView style={styles.control} />
      </Example>
    </Page>
  );
};

const createStyles = () =>
  StyleSheet.create({
    control: {
      minHeight: 800, 
      marginBottom: '-300', 
      marginTop: '-150'
    }
  });
