// Import React hook để quản lý state
import React, {useState} from 'react';
// Import các component cơ bản từ React Native
import {
  SafeAreaView, // Container an toàn cho các thiết bị có notch
  StyleSheet, // API để tạo styles
  View, // Container component
  Text, // Hiển thị text
  ScrollView, // Container có thể scroll
  TouchableOpacity, // Button có opacity effect khi nhấn
} from 'react-native';
// Import Calendar component và LocaleConfig từ react-native-calendars
import {Calendar, LocaleConfig} from 'react-native-calendars';

const EventCalendarScreen = () => {
  // State lưu ngày được chọn (format YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState('2025-01-01');
  
  // Object chứa events theo từng ngày (key = date, value = array of events)
  const events = {
    // Mỗi key là date string, value là array các events trong ngày đó
    '2025-01-01': [
      // Event 1: New Year Party
      {
        start: '2025-01-01 00:00:00', // Thời gian bắt đầu
        end: '2025-01-01 02:00:00', // Thời gian kết thúc
        title: 'New Year Party', // Tên event
        summary: 'xyz Location', // Mô tả chi tiết
      },
      // Event 2: New Year Wishes
      {
        start: '2025-01-01 01:00:00',
        end: '2025-01-01 02:00:00',
        title: 'New Year Wishes',
        summary: 'Call to every one',
      },
    ],
    // Ngày 2/1/2025: Birthday party
    '2025-01-02': [
      {
        start: '2025-01-02 00:30:00',
        end: '2025-01-02 01:30:00',
        title: 'Parag Birthday Party',
        summary: 'Call him',
      },
    ],
    // Ngày 3/1/2025: My birthday
    '2025-01-03': [
      {
        start: '2025-01-03 01:30:00',
        end: '2025-01-03 02:20:00',
        title: 'My Birthday Party',
        summary: 'Lets Enjoy',
      },
    ],
    // Ngày 4/2/2025: Engg Expo
    '2025-02-04': [
      {
        start: '2025-02-04 04:10:00',
        end: '2025-02-04 04:40:00',
        title: 'Engg Expo 2025',
        summary: 'Expo Venue not confirm',
      },
    ],
  };

  // Tạo object markedDates để đánh dấu các ngày có events trên calendar
  const markedDates = {};
  // Loop qua tất cả dates trong events object
  Object.keys(events).forEach(date => {
    markedDates[date] = {
      marked: true, // Hiển thị dot marker
      dotColor: '#007AFF', // Màu dot xanh
      selected: date === selectedDate, // Highlight nếu là ngày được chọn
      selectedColor: '#007AFF', // Màu background khi được chọn
    };
  });

  // Function format datetime string thành HH:MM
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString); // Parse string thành Date object
    const hours = String(date.getHours()).padStart(2, '0'); // Lấy giờ và pad 0
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Lấy phút và pad 0
    return `${hours}:${minutes}`; // Return format HH:MM
  };

  // Handler được gọi khi user click vào event card
  const eventClicked = (event) => {
    alert(JSON.stringify(event, null, 2)); // Alert hiển thị chi tiết event
  };

  // Handler được gọi khi user chọn một ngày trên calendar
  const onDayPress = (day) => {
    setSelectedDate(day.dateString); // Cập nhật state với ngày được chọn
  };

  // Lấy events của ngày được chọn, nếu không có events thì return empty array
  const selectedEvents = events[selectedDate] || [];

  return (
    // SafeAreaView container để tránh bị che bởi notch/status bar
    <SafeAreaView style={styles.container}>
      {/* View container chính */}
      <View style={styles.container}>
        {/* Text hiển thị title màn hình */}
        <Text style={styles.title}>Calendar with Events</Text>
        
        {/* Calendar component hiển thị lịch */}
        <Calendar
          // Ngày hiện tại được hiển thị trên calendar
          current={selectedDate}
          // Handler được gọi khi user chọn một ngày
          onDayPress={onDayPress}
          // Object chứa thông tin các ngày được đánh dấu (có events)
          markedDates={markedDates}
          // Theme object để custom giao diện calendar
          theme={{
            backgroundColor: '#ffffff', // Màu nền tổng thể
            calendarBackground: '#ffffff', // Màu nền calendar
            textSectionTitleColor: '#b6c1cd', // Màu text header (Mon, Tue, ...)
            selectedDayBackgroundColor: '#007AFF', // Màu nền ngày được chọn
            selectedDayTextColor: '#ffffff', // Màu text ngày được chọn
            todayTextColor: '#007AFF', // Màu text ngày hôm nay
            dayTextColor: '#2d4150', // Màu text các ngày thường
            textDisabledColor: '#d9e1e8', // Màu text các ngày disabled
            dotColor: '#007AFF', // Màu dot marker
            selectedDotColor: '#ffffff', // Màu dot khi ngày được chọn
            arrowColor: '#007AFF', // Màu mũi tên prev/next month
            monthTextColor: '#2d4150', // Màu text tháng/năm
            indicatorColor: '#007AFF', // Màu loading indicator
            textDayFontWeight: '300', // Font weight text ngày
            textMonthFontWeight: 'bold', // Font weight text tháng
            textDayHeaderFontWeight: '500', // Font weight header (Mon, Tue, ...)
            textDayFontSize: 16, // Font size text ngày
            textMonthFontSize: 18, // Font size text tháng
            textDayHeaderFontSize: 14, // Font size header
          }}
        />

        {/* Container chứa danh sách events */}
        <View style={styles.eventsContainer}>
          {/* Text hiển thị title của events list */}
          <Text style={styles.eventsTitle}>
            Events for {selectedDate}
          </Text>
          
          {/* ScrollView để scroll danh sách events */}
          <ScrollView style={styles.eventsList}>
            {/* Kiểm tra nếu có events cho ngày được chọn */}
            {selectedEvents.length > 0 ? (
              // Map qua mảng selectedEvents và render event card cho mỗi event
              selectedEvents.map((event, index) => (
                // TouchableOpacity làm event card có thể click
                <TouchableOpacity
                  key={index} // Key unique cho mỗi item trong list
                  style={styles.eventCard} // Style cho event card
                  onPress={() => eventClicked(event)} // Handler khi click vào event
                >
                  {/* Header chứa title và time của event */}
                  <View style={styles.eventHeader}>
                    {/* Text hiển thị tên event */}
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    {/* Text hiển thị thời gian event (start - end) */}
                    <Text style={styles.eventTime}>
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </Text>
                  </View>
                  {/* Text hiển thị summary/mô tả của event */}
                  <Text style={styles.eventSummary}>{event.summary}</Text>
                </TouchableOpacity>
              ))
            ) : (
              // Nếu không có events, hiển thị message "No events"
              <View style={styles.noEventsContainer}>
                <Text style={styles.noEventsText}>
                  No events for this date
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Export component để sử dụng ở nơi khác
export default EventCalendarScreen;

// StyleSheet định nghĩa các styles cho component
const styles = StyleSheet.create({
  // Style cho container chính
  container: {
    flex: 1, // Chiếm full màn hình
    backgroundColor: '#f5f5f5', // Màu nền xám nhạt
  },
  // Style cho title text
  title: {
    fontSize: 22, // Cỡ chữ lớn
    fontWeight: 'bold', // Chữ đậm
    textAlign: 'center', // Căn giữa
    paddingVertical: 15, // Padding trên dưới
    backgroundColor: '#fff', // Màu nền trắng
    color: '#333', // Màu text đen
  },
  // Style cho container chứa danh sách events
  eventsContainer: {
    flex: 1, // Chiếm phần còn lại của màn hình
    backgroundColor: '#fff', // Màu nền trắng
    marginTop: 10, // Khoảng cách với calendar
    paddingTop: 15, // Padding trên
  },
  // Style cho title của events list
  eventsTitle: {
    fontSize: 18, // Cỡ chữ vừa
    fontWeight: '600', // Chữ hơi đậm
    paddingHorizontal: 15, // Padding trái phải
    marginBottom: 10, // Khoảng cách với list
    color: '#555', // Màu text xám đậm
  },
  // Style cho ScrollView chứa events
  eventsList: {
    flex: 1, // Chiếm phần còn lại
    paddingHorizontal: 15, // Padding trái phải
  },
  // Style cho mỗi event card
  eventCard: {
    backgroundColor: '#f8f9fa', // Màu nền xám rất nhạt
    borderRadius: 8, // Bo góc 8px
    padding: 15, // Padding bên trong
    marginBottom: 10, // Khoảng cách giữa các cards
    borderLeftWidth: 4, // Border trái dày 4px
    borderLeftColor: '#007AFF', // Màu border xanh
    elevation: 1, // Shadow Android
    shadowColor: '#000', // Màu shadow iOS
    shadowOffset: {width: 0, height: 1}, // Offset shadow iOS
    shadowOpacity: 0.1, // Độ mờ shadow iOS
    shadowRadius: 2, // Radius shadow iOS
  },
  // Style cho header của event card (chứa title và time)
  eventHeader: {
    flexDirection: 'row', // Layout ngang
    justifyContent: 'space-between', // Space giữa title và time
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginBottom: 5, // Khoảng cách với summary
  },
  // Style cho title của event
  eventTitle: {
    fontSize: 16, // Cỡ chữ vừa
    fontWeight: 'bold', // Chữ đậm
    color: '#333', // Màu text đen
    flex: 1, // Chiếm phần còn lại (push time sang phải)
  },
  // Style cho time của event
  eventTime: {
    fontSize: 14, // Cỡ chữ nhỏ hơn title
    color: '#007AFF', // Màu text xanh
    fontWeight: '600', // Chữ hơi đậm
  },
  // Style cho summary của event
  eventSummary: {
    fontSize: 14, // Cỡ chữ nhỏ
    color: '#666', // Màu text xám
    marginTop: 5, // Khoảng cách với header
  },
  // Style cho container "No events"
  noEventsContainer: {
    alignItems: 'center', // Căn giữa ngang
    justifyContent: 'center', // Căn giữa dọc
    paddingVertical: 40, // Padding trên dưới
  },
  // Style cho text "No events"
  noEventsText: {
    fontSize: 16, // Cỡ chữ vừa
    color: '#999', // Màu text xám nhạt
    fontStyle: 'italic', // Chữ nghiêng
  },
});