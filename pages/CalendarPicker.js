import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const CalendarPickerScreen = () => {
  // State lưu ngày bắt đầu được chọn (Date object hoặc null)
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  // State lưu ngày kết thúc được chọn (Date object hoặc null)
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  // Handler được gọi khi user chọn một ngày
  // date: Date object được chọn
  // type: 'START_DATE' hoặc 'END_DATE'
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      // Nếu user chọn end date, cập nhật selectedEndDate
      setSelectedEndDate(date);
    } else {
      // Nếu user chọn start date, reset end date và cập nhật start date
      setSelectedEndDate(null); // Reset end date
      setSelectedStartDate(date); // Set start date mới
    }
  };

  return (
    // SafeAreaView container để tránh bị che bởi notch/status bar
    <SafeAreaView style={styles.container}>
      {/* View container chính */}
      <View style={styles.container}>
        {/* Text hiển thị title màn hình */}
        <Text style={styles.titleStyle}>React Native Calendar Picker</Text>

        {/* CalendarPicker component để chọn date range */}
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
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
        {/* View chứa text hiển thị các ngày đã chọn */}
        <View style={styles.textStyle}>
          {/* Label cho start date */}
          <Text style={styles.textStyle}>Selected Start Date :</Text>
          {/* Hiển thị start date đã chọn (nếu có) */}
          <Text style={styles.textStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ''}
          </Text>
          {/* Label cho end date */}
          <Text style={styles.textStyle}>Selected End Date :</Text>
          {/* Hiển thị end date đã chọn (nếu có) */}
          <Text style={styles.textStyle}>
            {selectedEndDate ? selectedEndDate.toString() : ''}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Export component để sử dụng ở nơi khác
export default CalendarPickerScreen;

// StyleSheet định nghĩa các styles cho component
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
