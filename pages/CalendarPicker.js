// React Native Calendar Picker using react-native-calendar-picker
// https://aboutreact.com/react-native-calendar-picker/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

//import CalendarPicker from the package we installed
import CalendarPicker from 'react-native-calendar-picker';

const CalendarPickerScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          React Native Calendar Picker
        </Text>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={
            [
              'Mon', 
              'Tue', 
              'Wed', 
              'Thur', 
              'Fri', 
              'Sat', 
              'Sun'
            ]}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            fontFamily: 'Cochin',
            color: '#000000',
          }}
          onDateChange={onDateChange}
        />
        <View style={styles.textStyle}>
          <Text style={styles.textStyle}>
            Selected Start Date :
          </Text>
          <Text style={styles.textStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ''}
          </Text>
          <Text style={styles.textStyle}>
            Selected End Date :
          </Text>
          <Text style={styles.textStyle}>
            {selectedEndDate ? selectedEndDate.toString() : ''}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CalendarPickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
});