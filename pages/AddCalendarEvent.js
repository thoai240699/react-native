// Import React hooks để quản lý state và lifecycle
import React, {useState, useEffect} from 'react';
// Import các component cơ bản từ React Native
import {
  SafeAreaView, // Container an toàn tránh notch/status bar
  StyleSheet, // Tạo styles cho component
  Text, // Hiển thị text
  View, // Container cơ bản
  TextInput, // Input nhập text
  TouchableOpacity, // Button có hiệu ứng opacity khi nhấn
  Alert, // Hiển thị dialog thông báo
  ScrollView, // View có thể scroll
} from 'react-native';
// Import thư viện Calendar của Expo để quản lý lịch
import * as Calendar from 'expo-calendar';
// Import moment.js để xử lý thời gian
import moment from 'moment';

// Định nghĩa tiêu đề mặc định cho event
const EVENT_TITLE = 'Lunch';
// Lấy thời gian hiện tại theo UTC
const TIME_NOW_IN_UTC = moment.utc();

const AddCalendarEventScreen = () => {
  // State lưu event ID được nhập từ TextInput
  const [text, setText] = useState('');
  // State kiểm tra quyền truy cập calendar
  const [hasPermission, setHasPermission] = useState(false);
  // State lưu ID của event vừa tạo
  const [lastEventId, setLastEventId] = useState('');
  // State lưu ID của calendar được chọn
  const [calendarId, setCalendarId] = useState(null);

  // Hook chạy khi component mount, yêu cầu quyền truy cập calendar
  useEffect(() => {
    requestCalendarPermission(); // Gọi hàm xin quyền
  }, []); // Dependency array rỗng = chỉ chạy 1 lần khi mount

  // Hàm async yêu cầu quyền truy cập calendar từ thiết bị
  const requestCalendarPermission = async () => {
    try {
      // Gọi API xin quyền calendar và lấy status
      const {status} = await Calendar.requestCalendarPermissionsAsync();
      
      // Kiểm tra nếu quyền được cấp
      if (status === 'granted') {
        setHasPermission(true); // Cập nhật state quyền truy cập
        // Lấy danh sách tất cả calendars có type là EVENT
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Available calendars:', calendars); // Log để debug
        
        // Kiểm tra có calendar nào không
        if (calendars.length > 0) {
          // Tìm calendar primary hoặc lấy calendar đầu tiên
          const primaryCalendar = calendars.find(cal => cal.isPrimary) || calendars[0];
          setCalendarId(primaryCalendar.id); // Lưu ID calendar
          // Hiển thị thông báo thành công
          Alert.alert('Success', `Calendar permissions granted!\nUsing: ${primaryCalendar.title}`);
        } else {
          // Không tìm thấy calendar nào trên thiết bị
          Alert.alert('Warning', 'No calendars found on device');
        }
      } else {
        // Quyền bị từ chối
        setHasPermission(false);
        Alert.alert('Error', 'Calendar permissions denied!');
      }
    } catch (error) {
      // Bắt lỗi nếu có exception
      console.error('Permission error:', error);
      Alert.alert('Error', 'Failed to request permissions: ' + error.message);
    }
  };

  // Hàm async thêm event mới vào calendar
  const addToCalendar = async () => {
    // Kiểm tra quyền truy cập calendar
    if (!hasPermission) {
      Alert.alert('Error', 'Calendar permission not granted');
      return; // Dừng thực thi nếu không có quyền
    }

    // Kiểm tra có calendar ID không
    if (!calendarId) {
      Alert.alert('Error', 'No calendar available');
      return; // Dừng nếu không có calendar
    }

    try {
      // Chuyển đổi thời gian UTC sang Date object cho startDate
      const startDate = moment.utc(TIME_NOW_IN_UTC).toDate();
      // Tạo endDate bằng cách thêm 1 giờ vào startDate
      const endDate = moment.utc(TIME_NOW_IN_UTC).add(1, 'hours').toDate();

      // Tạo object chứa thông tin chi tiết của event
      const eventDetails = {
        title: EVENT_TITLE, // Tiêu đề event
        startDate: startDate, // Thời gian bắt đầu
        endDate: endDate, // Thời gian kết thúc
        notes: 'Tasty lunch event!', // Ghi chú cho event
        location: 'Restaurant XYZ', // Địa điểm tổ chức
        timeZone: 'Asia/Ho_Chi_Minh', // Múi giờ Việt Nam
        alarms: [{ // Mảng các alarm/nhắc nhở
          relativeOffset: -15, // Nhắc trước 15 phút
        }],
      };

      console.log('Creating event with:', eventDetails); // Log để debug
      // Gọi API tạo event và nhận về event ID
      const eventId = await Calendar.createEventAsync(calendarId, eventDetails);
      
      setLastEventId(eventId); // Lưu ID event vừa tạo vào state
      // Hiển thị thông báo thành công với event ID
      Alert.alert(
        'Success',
        `Event created successfully!\nEvent ID: ${eventId}\n\nCheck your device calendar app.`
      );
    } catch (error) {
      // Bắt và xử lý lỗi khi tạo event
      console.error('Add event error:', error);
      Alert.alert('Error', `Failed to add event: ${error.message}`);
    }
  };

  // Hàm async chỉnh sửa event đã tồn tại
  const editCalendarEvent = async (eventId) => {
    // Kiểm tra event ID có được nhập không
    if (!eventId) {
      Alert.alert('Error', 'Please insert Event ID');
      return; // Dừng nếu không có ID
    }

    // Kiểm tra quyền truy cập calendar
    if (!hasPermission) {
      Alert.alert('Error', 'Calendar permission not granted');
      return; // Dừng nếu không có quyền
    }

    try {
      // Tạo thời gian bắt đầu mới
      const startDate = moment.utc(TIME_NOW_IN_UTC).toDate();
      // Tạo thời gian kết thúc mới (2 giờ thay vì 1 giờ)
      const endDate = moment.utc(TIME_NOW_IN_UTC).add(2, 'hours').toDate();

      // Object chứa thông tin event mới để cập nhật
      const eventDetails = {
        title: EVENT_TITLE + ' (Edited)', // Thêm text "(Edited)" vào title
        startDate: startDate, // Thời gian bắt đầu mới
        endDate: endDate, // Thời gian kết thúc mới
        notes: 'Updated lunch event!', // Ghi chú được cập nhật
        location: 'New Restaurant ABC', // Địa điểm mới
      };

      // Gọi API cập nhật event với ID và thông tin mới
      await Calendar.updateEventAsync(eventId, eventDetails);
      // Hiển thị thông báo cập nhật thành công
      Alert.alert('Success', 'Event updated successfully!');
    } catch (error) {
      // Bắt và xử lý lỗi khi chỉnh sửa
      console.error('Edit event error:', error);
      Alert.alert('Error', `Failed to edit event: ${error.message}`);
    }
  };

  // Hàm async xem chi tiết một event
  const viewCalendarEvent = async (eventId) => {
    // Kiểm tra event ID có được nhập không
    if (!eventId) {
      Alert.alert('Error', 'Please insert Event ID');
      return; // Dừng nếu không có ID
    }

    // Kiểm tra quyền truy cập calendar
    if (!hasPermission) {
      Alert.alert('Error', 'Calendar permission not granted');
      return; // Dừng nếu không có quyền
    }

    try {
      // Gọi API lấy thông tin event theo ID
      const event = await Calendar.getEventAsync(eventId);
      
      // Kiểm tra event có tồn tại không
      if (event) {
        // Tạo chuỗi hiển thị chi tiết event
        const eventDetails = `
Title: ${event.title}
Start: ${moment(event.startDate).format('lll')} // Format thời gian dễ đọc
End: ${moment(event.endDate).format('lll')} // Format thời gian dễ đọc
Location: ${event.location || 'N/A'} // Hiển thị 'N/A' nếu không có location
Notes: ${event.notes || 'N/A'} // Hiển thị 'N/A' nếu không có notes
Calendar: ${event.calendarId} // ID của calendar chứa event
        `;
        // Hiển thị thông tin event trong Alert dialog
        Alert.alert('Event Details', eventDetails);
      } else {
        // Event không tồn tại với ID đã cho
        Alert.alert('Error', 'Event not found');
      }
    } catch (error) {
      // Bắt và xử lý lỗi khi xem event
      console.error('View event error:', error);
      Alert.alert('Error', `Failed to view event: ${error.message}`);
    }
  };

  // Hàm async xóa một event khỏi calendar
  const deleteCalendarEvent = async (eventId) => {
    // Kiểm tra event ID có được nhập không
    if (!eventId) {
      Alert.alert('Error', 'Please insert Event ID');
      return; // Dừng nếu không có ID
    }

    // Kiểm tra quyền truy cập calendar
    if (!hasPermission) {
      Alert.alert('Error', 'Calendar permission not granted');
      return; // Dừng nếu không có quyền
    }

    try {
      // Gọi API xóa event theo ID
      await Calendar.deleteEventAsync(eventId);
      // Hiển thị thông báo xóa thành công
      Alert.alert('Success', 'Event deleted successfully!');
      // Nếu event vừa xóa là lastEventId thì clear nó
      if (lastEventId === eventId) {
        setLastEventId(''); // Reset lastEventId
      }
      setText(''); // Clear TextInput
    } catch (error) {
      // Bắt và xử lý lỗi khi xóa event
      console.error('Delete event error:', error);
      Alert.alert('Error', `Failed to delete event: ${error.message}`);
    }
  };

  // Component render chính
  return (
    // SafeAreaView đảm bảo nội dung không bị che bởi notch/status bar
    <SafeAreaView style={styles.container}>
      {/* ScrollView cho phép scroll nội dung nếu quá dài */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Container chính chứa tất cả nội dung */}
        <View style={styles.container}>
          {/* Tiêu đề màn hình */}
          <Text style={styles.titleStyle}>
            Add Event in Device's Calendar from React Native App
          </Text>

          {/* Section hiển thị trạng thái quyền truy cập */}
          <View style={styles.permissionContainer}>
            {/* Hiển thị trạng thái permission với icon */}
            <Text style={styles.permissionText}>
              Permission: {hasPermission ? '✓ Granted' : '✗ Denied'}
            </Text>
            {/* Hiển thị trạng thái calendar */}
            <Text style={styles.permissionText}>
              Calendar: {calendarId ? '✓ Found' : '✗ Not Found'}
            </Text>
            {/* Chỉ hiển thị button Request Permission nếu chưa có quyền */}
            {!hasPermission && (
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={requestCalendarPermission}> {/* Gọi hàm xin quyền khi nhấn */}
                <Text style={styles.buttonTextStyle}>Request Permission</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Section tạo event mới */}
          <View style={styles.section}>
            {/* Hiển thị thông tin event sẽ tạo */}
            <Text style={styles.heading}>
              Event title: {EVENT_TITLE}
              {'\n'} {/* Xuống dòng */}
              Event Date Time: {moment.utc(TIME_NOW_IN_UTC).local().format('lll')} {/* Format thời gian */}
            </Text>
            {/* Button thêm event vào calendar */}
            <TouchableOpacity
              style={[styles.buttonStyle, {minWidth: '100%'}]} // Merge styles
              onPress={addToCalendar} // Gọi hàm thêm event
              disabled={!hasPermission || !calendarId}> {/* Disable nếu không có quyền hoặc calendar */}
              <Text style={styles.buttonTextStyle}>Add Event to Calendar</Text>
            </TouchableOpacity>
          </View>

          {lastEventId ? (
            <View style={styles.eventIdContainer}>
              <Text style={styles.eventIdText}>Last Event ID:</Text>
              <Text style={styles.eventIdValue}>{lastEventId}</Text>
            </View>
          ) : null}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manage Event by ID</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter event ID or use last created ID"
              placeholderTextColor="#999"
              onChangeText={(text) => setText(text)}
              value={text}
            />
            {lastEventId && !text && (
              <TouchableOpacity
                style={styles.useLastButton}
                onPress={() => setText(lastEventId)}>
                <Text style={styles.useLastText}>Use Last Event ID</Text>
              </TouchableOpacity>
            )}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.buttonHalfStyle}
                onPress={() => editCalendarEvent(text || lastEventId)}
                disabled={!hasPermission}>
                <Text style={styles.buttonTextStyle}>Edit Event</Text>
              </TouchableOpacity>
              <View style={{width: 10}} />
              <TouchableOpacity
                style={styles.buttonHalfStyle}
                onPress={() => viewCalendarEvent(text || lastEventId)}
                disabled={!hasPermission}>
                <Text style={styles.buttonTextStyle}>View Event</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.deleteButton, {minWidth: '100%'}]}
              onPress={() => deleteCalendarEvent(text || lastEventId)}
              disabled={!hasPermission}>
              <Text style={styles.buttonTextStyle}>Delete Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCalendarEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  permissionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  permissionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  permissionButton: {
    backgroundColor: '#f5821f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 5,
  },
  buttonStyle: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#f5821f',
    marginTop: 10,
    borderRadius: 5,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonHalfStyle: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f5821f',
    borderRadius: 5,
    elevation: 2,
  },
  inputStyle: {
    height: 50,
    width: '100%',
    marginTop: 10,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 16,
  },
  useLastButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  useLastText: {
    color: '#f5821f',
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventIdContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  eventIdText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  eventIdValue: {
    color: '#f5821f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});