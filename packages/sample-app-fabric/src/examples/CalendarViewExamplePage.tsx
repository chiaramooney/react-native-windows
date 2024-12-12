'use strict';
import React, {useState} from 'react';
import {Example} from '../components/Example';
import {Page} from '../components/Page';
import {StyleSheet, Text, View} from 'react-native';
import CalendarView  from '../XamlCalendarViewNativeComponent';

export const CalendarViewExamplePage: React.FunctionComponent<{}> = () => {
  const [date, setDate] = useState('No Date Specified');
  const styles = createStyles();

  const textExample1 =
    '<CalendarView /> ';

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
            <Text style={styles.text}>Date Selected: {date}</Text>
            <CalendarView style={styles.control} onSelectedDatesChanged={onSelectedDatesChanged}/>
      </Example>
    </Page>
  );
};

const createStyles = () =>
  StyleSheet.create({
    control: {
      minHeight: 800, 
      minWidth: 700,
      marginBottom: '-270', 
      marginTop: '-180'
    },
    text: {
      fontWeight: '600',
      fontSize: 18,
      paddingBottom: 10,
      paddingLeft: 5
    }
  });
