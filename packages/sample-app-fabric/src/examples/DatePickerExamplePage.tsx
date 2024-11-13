'use strict';
import React, {useState} from 'react';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {Example} from '../components/Example';
import {Page} from '../components/Page';
import {Alert, Text, View} from 'react-native';
import CalendarView from '../XamlCalendarViewNativeComponent';

export const DatePickerExamplePage: React.FunctionComponent<{}> = () => {
  const [date1] = useState(new Date());
  const [date2] = useState(new Date());

  const textExample1 =
    '<CalendarView value={date} mode="date" style={{width: 200, opacity: 1, height: 50}}/>';
  const textExample2 = `<DateTimePicker
  value={date2}
  mode="date"
  style={{width: 200, opacity: 1, height: 50}}
  dayOfWeekFormat={'{dayofweek.abbreviated(3)}'}
  firstDayOfWeek={1} />`;

  const onSelectedDatesChanged = (e) =>{
    Alert.alert("StartDate: " + e.nativeEvent.startDate);
  }

  return (
    <Page
      title="CalendarView"
      description={
        'Use a CalendarView to let users set a date in your app, for example to schedule an appointment.'
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
      <Example title="A simple CalendarView." code={textExample1}>
        <View style={{
            flexDirection: 'column'
            }}>
            <CalendarView
              style={{flex: 1, width: 400, height: 400, minWidth: 400, minHeight: 400}}  
              onSelectedDatesChanged={onSelectedDatesChanged}
            />
        </View>
      </Example>
      <Example
        title="A CalendarView with day of week formatted and first day of week adjusted."
        code={textExample2}>
          <View style={{
            flexDirection: 'column'
            }}>
            <CalendarView style={{flex: 1, width: 400, height: 400, minWidth: 400, minHeight: 400}}  />
        </View>
      </Example>
    </Page>
  );
};
