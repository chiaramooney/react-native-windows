'use strict';
import React, {useState} from 'react';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {Example} from '../components/Example';
import {Page} from '../components/Page';
import {StyleSheet, Text, View} from 'react-native';
// IMPORT OF CALENDARVIEW MODULE
import CalendarView  from '../XamlCalendarViewNativeComponent';

export const CalendarViewExamplePage: React.FunctionComponent<{}> = () => {
  // TODO: STATE VARIABLE FOR SELECTED DATE
  const [date, setDate] = useState('No Date Selected');
  const styles = createStyles();

  const textExample1 =
    '<CalendarView /> ';

  // TODO: DATE CHANGE EVENT HANDLER
  const onSelectedDatesChanged = (e: any) => {
    setDate(e.nativeEvent.startDate);
  }

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
            {/* TODO: DISPLAY SELECTED DATE */}
            <Text style={styles.text}>Selected Date: {date}</Text>
            {/* TODO: CALENDAR VIEW CONTROL */}
            <CalendarView style={styles.control} onSelectedDatesChanged={onSelectedDatesChanged}/>
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
    },
    text: {
      fontWeight: '600',
      fontSize: 18,
      paddingBottom: 10,
      paddingLeft: 5
    }
  });
