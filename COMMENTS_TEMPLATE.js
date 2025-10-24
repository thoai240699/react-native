/**
 * HƯỚNG DẪN THÊM COMMENTS CHI TIẾT CHO CÁC FILE REACT NATIVE
 * 
 * File này chứa templates và hướng dẫn để thêm inline comments
 * cho tất cả các file trong folder pages/
 */

// ==================== MẪU COMMENTS CHO CÁC PHẦN KHÁC NHAU ====================

/**
 * 1. IMPORTS
 * - Giải thích mục đích của từng import
 * - Phân loại: React hooks, React Native components, Third-party libraries
 */

// Import React hooks để quản lý state và lifecycle
import React, {useState, useEffect} from 'react';

// Import các component cơ bản từ React Native
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Import thư viện bên thứ 3 cho [chức năng cụ thể]
import moment from 'moment';

/**
 * 2. CONSTANTS
 * - Giải thích ý nghĩa và mục đích sử dụng
 */

// URL endpoint để call API lấy dữ liệu users
const API_URL = 'https://api.example.com/users';

// Số lượng items hiển thị trên mỗi trang
const ITEMS_PER_PAGE = 10;

/**
 * 3. STATE DECLARATIONS
 * - Mô tả dữ liệu được lưu và mục đích
 * - Giải thích initial value
 */

// State lưu danh sách users được fetch từ API
const [users, setUsers] = useState([]);

// State kiểm tra loading state khi call API
const [isLoading, setIsLoading] = useState(false);

// State lưu thông báo lỗi nếu có
const [error, setError] = useState(null);

// State kiểm soát việc hiển thị modal
const [isModalVisible, setIsModalVisible] = useState(false);

/**
 * 4. useEffect HOOKS
 * - Giải thích khi nào effect chạy
 * - Mô tả hành động thực hiện
 * - Giải thích dependencies
 */

// Hook chạy một lần khi component mount
useEffect(() => {
  fetchUsers(); // Gọi hàm fetch dữ liệu users
}, []); // Dependency array rỗng = chỉ chạy 1 lần

// Hook chạy mỗi khi userId thay đổi
useEffect(() => {
  if (userId) {
    fetchUserDetails(userId); // Fetch chi tiết user mới
  }
}, [userId]); // Chạy lại khi userId thay đổi

// Hook cleanup để clear interval/timer khi unmount
useEffect(() => {
  const timer = setInterval(() => {
    updateTime(); // Cập nhật thời gian mỗi giây
  }, 1000);
  
  return () => {
    clearInterval(timer); // Cleanup: clear interval khi component unmount
  };
}, []);

/**
 * 5. ASYNC FUNCTIONS
 * - Mô tả flow xử lý
 * - Giải thích từng bước trong try-catch
 */

// Hàm async fetch danh sách users từ API
const fetchUsers = async () => {
  // Set loading state = true trước khi fetch
  setIsLoading(true);
  
  try {
    // Gọi API với method GET
    const response = await fetch(API_URL);
    
    // Parse response body thành JSON
    const data = await response.json();
    
    // Cập nhật state users với dữ liệu mới
    setUsers(data);
    
    // Clear error nếu fetch thành công
    setError(null);
  } catch (err) {
    // Bắt lỗi và lưu vào state
    setError(err.message);
    console.error('Fetch error:', err); // Log lỗi để debug
  } finally {
    // Set loading = false sau khi hoàn thành (dù thành công hay thất bại)
    setIsLoading(false);
  }
};

/**
 * 6. EVENT HANDLERS
 * - Giải thích sự kiện trigger
 * - Mô tả logic xử lý
 */

// Handler xử lý khi user nhấn button submit
const handleSubmit = () => {
  // Validate dữ liệu trước khi submit
  if (!validateForm()) {
    Alert.alert('Error', 'Please fill all required fields');
    return; // Dừng thực thi nếu validation fail
  }
  
  // Gọi API để save data
  saveData();
};

// Handler xử lý khi user thay đổi text trong input
const handleTextChange = (text) => {
  // Cập nhật state với giá trị mới
  setInputValue(text);
  
  // Clear error message nếu có
  if (error) {
    setError(null);
  }
};

/**
 * 7. RENDER HELPERS
 * - Giải thích logic render
 */

// Hàm render một item trong FlatList
const renderItem = ({item}) => (
  // Touchable wrapper để handle press event
  <TouchableOpacity onPress={() => handleItemPress(item)}>
    {/* Container chứa thông tin item */}
    <View style={styles.itemContainer}>
      {/* Tên của item */}
      <Text style={styles.itemName}>{item.name}</Text>
      {/* Mô tả ngắn của item */}
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  </TouchableOpacity>
);

/**
 * 8. JSX/RENDER
 * - Giải thích cấu trúc UI
 * - Mô tả conditional rendering
 */

return (
  // Container chính của màn hình
  <View style={styles.container}>
    {/* Header với tiêu đề */}
    <View style={styles.header}>
      <Text style={styles.title}>User List</Text>
    </View>
    
    {/* Hiển thị loading indicator khi đang fetch data */}
    {isLoading && (
      <ActivityIndicator size="large" color="#0000ff" />
    )}
    
    {/* Hiển thị error message nếu có lỗi */}
    {error && (
      <Text style={styles.errorText}>{error}</Text>
    )}
    
    {/* Hiển thị danh sách users nếu có data và không loading */}
    {!isLoading && users.length > 0 && (
      <FlatList
        data={users} // Dữ liệu để render
        renderItem={renderItem} // Function render mỗi item
        keyExtractor={(item) => item.id.toString()} // Unique key cho mỗi item
      />
    )}
    
    {/* Hiển thị message khi không có data */}
    {!isLoading && users.length === 0 && (
      <Text style={styles.emptyText}>No users found</Text>
    )}
    
    {/* Button thêm user mới */}
    <TouchableOpacity
      style={styles.addButton}
      onPress={handleAddUser}> {/* Gọi handler khi nhấn */}
      <Text style={styles.addButtonText}>Add User</Text>
    </TouchableOpacity>
  </View>
);

/**
 * 9. STYLESHEET
 * - Giải thích mục đích của mỗi style
 * - Mô tả các giá trị đặc biệt
 */

const styles = StyleSheet.create({
  // Style cho container chính của màn hình
  container: {
    flex: 1, // Chiếm toàn bộ không gian available
    padding: 16, // Padding 16px tất cả các cạnh
    backgroundColor: '#ffffff', // Màu nền trắng
  },
  
  // Style cho header section
  header: {
    paddingVertical: 20, // Padding dọc 20px
    borderBottomWidth: 1, // Border dưới 1px
    borderBottomColor: '#e0e0e0', // Màu border xám nhạt
  },
  
  // Style cho text tiêu đề
  title: {
    fontSize: 24, // Kích thước font lớn
    fontWeight: 'bold', // Chữ đậm
    color: '#333333', // Màu chữ xám đậm
    textAlign: 'center', // Căn giữa
  },
  
  // Style cho item container trong list
  itemContainer: {
    padding: 12, // Padding trong 12px
    marginVertical: 6, // Margin dọc 6px giữa các items
    backgroundColor: '#f5f5f5', // Màu nền xám nhạt
    borderRadius: 8, // Bo góc 8px
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation cho Android
    elevation: 2,
  },
  
  // Style cho button
  button: {
    backgroundColor: '#007AFF', // Màu xanh iOS
    paddingVertical: 12, // Padding dọc
    paddingHorizontal: 24, // Padding ngang
    borderRadius: 8, // Bo góc
    alignItems: 'center', // Căn giữa nội dung
    marginTop: 16, // Khoảng cách phía trên
  },
  
  // Style cho text trong button
  buttonText: {
    color: '#ffffff', // Chữ màu trắng
    fontSize: 16, // Font size medium
    fontWeight: '600', // Font weight semi-bold
  },
  
  // Style cho text error
  errorText: {
    color: '#ff3b30', // Màu đỏ
    fontSize: 14, // Font nhỏ
    textAlign: 'center', // Căn giữa
    marginVertical: 10, // Margin dọc
  },
});

// ==================== CHECKLIST COMMENTS CHO TỪNG FILE ====================

/**
 * FILE: SearchableDropdown.js
 * - [ ] Comment imports (React, React Native, SearchableDropdown)
 * - [ ] Comment items array (data mẫu)
 * - [ ] Comment state serverData
 * - [ ] Comment useEffect fetch API
 * - [ ] Comment JSX structure (2 dropdowns)
 * - [ ] Comment props của SearchableDropdown
 * - [ ] Comment styles
 */

/**
 * FILE: MultiSelect.js
 * - [ ] Comment imports
 * - [ ] Comment items array
 * - [ ] Comment states
 * - [ ] Comment onSelectedItemsChange handler
 * - [ ] Comment MultiSelect component props
 * - [ ] Comment styles
 */

/**
 * FILE: EventCalendar.js
 * - [ ] Comment imports
 * - [ ] Comment events object (data cứng)
 * - [ ] Comment markedDates logic
 * - [ ] Comment formatTime function
 * - [ ] Comment eventClicked handler
 * - [ ] Comment Calendar component
 * - [ ] Comment event list rendering
 * - [ ] Comment styles
 */

/**
 * FILE: CalendarPicker.js
 * - [ ] Comment imports
 * - [ ] Comment states (selectedStartDate, selectedEndDate)
 * - [ ] Comment onDateChange handler
 * - [ ] Comment CalendarPicker props
 * - [ ] Comment date display logic
 * - [ ] Comment styles
 */

/**
 * FILE: CollapsibleAccordion.js
 * - [ ] Comment CONTENT array
 * - [ ] Comment SELECTORS array
 * - [ ] Comment states
 * - [ ] Comment toggleExpanded
 * - [ ] Comment setSections
 * - [ ] Comment renderHeader
 * - [ ] Comment renderContent
 * - [ ] Comment Accordion component
 * - [ ] Comment styles
 */

/**
 * FILE: RegisterUser.js, UpdateUser.js, DeleteUser.js, ViewUser.js, ViewAllUser.js
 * - [ ] Comment database imports
 * - [ ] Comment states (input fields)
 * - [ ] Comment database operations (insert, update, delete, query)
 * - [ ] Comment validation logic
 * - [ ] Comment navigation
 * - [ ] Comment form inputs
 * - [ ] Comment styles
 */

/**
 * FILE: HomeScreen.js
 * - [ ] Comment navigation buttons
 * - [ ] Comment button press handlers
 * - [ ] Comment layout structure
 * - [ ] Comment styles
 */

/**
 * FILE: components/Mybutton.js, Mytext.js, Mytextinput.js
 * - [ ] Comment props
 * - [ ] Comment customization logic
 * - [ ] Comment default values
 * - [ ] Comment styles
 */

// ==================== IMPORTANT NOTES ====================

/**
 * NGUYÊN TẮC COMMENTS:
 * 
 * 1. Comments phải ngắn gọn nhưng đủ ý
 * 2. Giải thích "tại sao" hơn là "cái gì"
 * 3. Sử dụng tiếng Việt cho dễ hiểu
 * 4. Comment trước code, không comment sau dòng code
 * 5. Nhóm các comments liên quan lại với nhau
 * 6. Cập nhật comments khi code thay đổi
 * 7. Tránh comments quá dài dòng
 * 8. Sử dụng JSDoc cho functions phức tạp
 */

/**
 * PATTERN COMMENTS THÔNG DỤNG:
 * 
 * - "// State lưu [mô tả]"
 * - "// Hàm [async/sync] [mô tả chức năng]"
 * - "// Hook chạy khi [điều kiện]"
 * - "// Handler xử lý [sự kiện]"
 * - "// Kiểm tra [điều kiện]"
 * - "// Gọi API để [mục đích]"
 * - "// Cập nhật state [tên state]"
 * - "// Hiển thị [component] nếu [điều kiện]"
 * - "// Style cho [element]"
 * - "// Cleanup: [hành động]"
 */

export default "Comments Guide Template";
