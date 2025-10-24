import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

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
  Object.keys(events).forEach((date) => {
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
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#007AFF',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#007AFF',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#007AFF',
            selectedDotColor: '#ffffff',
            arrowColor: '#007AFF',
            monthTextColor: '#2d4150',
            indicatorColor: '#007AFF',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />

        {/* Container chứa danh sách events */}
        <View style={styles.eventsContainer}>
          {/* Text hiển thị title của events list */}
          <Text style={styles.eventsTitle}>Events for {selectedDate}</Text>

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
                <Text style={styles.noEventsText}>No events for this date</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    color: '#333',
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    paddingTop: 15,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#555',
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  eventCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  eventTime: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  eventSummary: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noEventsText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});
