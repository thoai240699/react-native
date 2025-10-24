// Import React hook để quản lý state
import React, {useState} from 'react';
// Import các component cơ bản từ React Native
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
// Import CalendarPicker component để chọn date range
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
        <Text style={styles.titleStyle}>
          React Native Calendar Picker
        </Text>
        
        {/* CalendarPicker component để chọn date range */}
        <CalendarPicker
          // Tuần bắt đầu từ thứ 2 thay vì chủ nhật
          startFromMonday={true}
          // Cho phép chọn range (start date và end date)
          allowRangeSelection={true}
          // Ngày tối thiểu có thể chọn (1/2/2018)
          minDate={new Date(2018, 1, 1)}
          // Ngày tối đa có thể chọn (3/7/2050)
          maxDate={new Date(2050, 6, 3)}
          // Mảng custom tên các ngày trong tuần
          weekdays={
            [
              'Mon',  // Thứ 2
              'Tue',  // Thứ 3
              'Wed',  // Thứ 4
              'Thur', // Thứ 5
              'Fri',  // Thứ 6
              'Sat',  // Thứ 7
              'Sun'   // Chủ nhật
            ]}
          // Mảng custom tên các tháng
          months={[
            'January',   // Tháng 1
            'Febraury',  // Tháng 2
            'March',     // Tháng 3
            'April',     // Tháng 4
            'May',       // Tháng 5
            'June',      // Tháng 6
            'July',      // Tháng 7
            'August',    // Tháng 8
            'September', // Tháng 9
            'October',   // Tháng 10
            'November',  // Tháng 11
            'December',  // Tháng 12
          ]}
          // Text hiển thị cho button "Previous month"
          previousTitle="Previous"
          // Text hiển thị cho button "Next month"
          nextTitle="Next"
          // Màu nền cho ngày hôm nay
          todayBackgroundColor="#e6ffe6"
          // Màu nền cho ngày được chọn
          selectedDayColor="#66ff33"
          // Màu text cho ngày được chọn
          selectedDayTextColor="#000000"
          // Scale factor để adjust size calendar
          scaleFactor={375}
          // Style cho text trong calendar
          textStyle={{
            fontFamily: 'Cochin', // Font family
            color: '#000000', // Màu text đen
          }}
          // Handler được gọi khi user chọn ngày
          onDateChange={onDateChange}
        />
        {/* View chứa text hiển thị các ngày đã chọn */}
        <View style={styles.textStyle}>
          {/* Label cho start date */}
          <Text style={styles.textStyle}>
            Selected Start Date :
          </Text>
          {/* Hiển thị start date đã chọn (nếu có) */}
          <Text style={styles.textStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ''}
          </Text>
          {/* Label cho end date */}
          <Text style={styles.textStyle}>
            Selected End Date :
          </Text>
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
  // Style cho container chính
  container: {
    flex: 1, // Chiếm full màn hình
    paddingTop: 30, // Padding trên
    backgroundColor: '#ffffff', // Màu nền trắng
    padding: 16, // Padding xung quanh
  },
  // Style cho text hiển thị dates
  textStyle: {
    marginTop: 10, // Khoảng cách với element phía trên
  },
  // Style cho title text
  titleStyle: {
    textAlign: 'center', // Căn giữa
    fontSize: 20, // Cỡ chữ lớn
    margin: 20, // Margin xung quanh
  },
});