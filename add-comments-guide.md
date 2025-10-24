# Hướng dẫn thêm inline comments cho React Native Project

## Mẫu Comments Chuẩn

### 1. Import Statements
```javascript
// Import React hooks để quản lý state và lifecycle
import React, {useState, useEffect} from 'react';

// Import các component cơ bản từ React Native
import { View, Text, StyleSheet } from 'react-native';

// Import thư viện bên thứ 3
import moment from 'moment';
```

### 2. State Declarations
```javascript
// State lưu trữ [mô tả ý nghĩa]
const [data, setData] = useState([]);

// State kiểm tra [điều kiện]
const [isLoading, setIsLoading] = useState(false);
```

### 3. useEffect Hook
```javascript
// Hook chạy khi component mount, thực hiện [hành động]
useEffect(() => {
  fetchData(); // Gọi hàm lấy dữ liệu
}, []); // Dependency array rỗng = chỉ chạy 1 lần
```

### 4. Functions
```javascript
// Hàm async [mô tả chức năng chính]
const fetchData = async () => {
  try {
    // Gọi API để [mục đích]
    const response = await fetch(url);
    
    // Parse response thành JSON
    const data = await response.json();
    
    // Cập nhật state với dữ liệu mới
    setData(data);
  } catch (error) {
    // Bắt và xử lý lỗi
    console.error(error);
  }
};
```

### 5. Event Handlers
```javascript
// Xử lý sự kiện khi [hành động người dùng]
const handlePress = () => {
  // Kiểm tra điều kiện trước khi thực hiện
  if (!isValid) {
    Alert.alert('Error', 'Invalid input');
    return; // Dừng thực thi nếu không hợp lệ
  }
  
  // Thực hiện hành động chính
  processData();
};
```

### 6. Render/JSX
```javascript
return (
  {/* Container chính của màn hình */}
  <View style={styles.container}>
    {/* Tiêu đề màn hình */}
    <Text style={styles.title}>Title</Text>
    
    {/* Button thực hiện [hành động] */}
    <TouchableOpacity onPress={handlePress}>
      <Text>Press Me</Text>
    </TouchableOpacity>
    
    {/* Hiển thị danh sách nếu có dữ liệu */}
    {data.length > 0 && (
      <FlatList data={data} renderItem={renderItem} />
    )}
  </View>
);
```

### 7. StyleSheet
```javascript
const styles = StyleSheet.create({
  // Style cho container chính
  container: {
    flex: 1, // Chiếm toàn bộ không gian
    padding: 20, // Khoảng cách từ viền
    backgroundColor: '#fff', // Màu nền trắng
  },
  // Style cho text tiêu đề
  title: {
    fontSize: 20, // Kích thước font
    fontWeight: 'bold', // Chữ đậm
    marginBottom: 10, // Khoảng cách phía dưới
  },
});
```

## Checklist cho từng file

- [ ] Thêm comments cho tất cả imports
- [ ] Giải thích mục đích của mỗi state
- [ ] Mô tả logic trong useEffect
- [ ] Giải thích từng bước trong functions
- [ ] Mô tả event handlers
- [ ] Comments cho conditional rendering
- [ ] Giải thích style properties

## Files cần thêm comments

1. AddCalendarEvent.js ✅ (Đã hoàn thành một phần)
2. CalendarPicker.js
3. CollapsibleAccordion.js
4. DatePicker.js
5. DeleteUser.js
6. EventCalendar.js
7. HomeScreen.js
8. MultiSelect.js
9. RegisterUser.js
10. SearchableDropdown.js
11. UpdateUser.js
12. ViewAllUser.js
13. ViewUser.js
14. components/Mybutton.js
15. components/Mytext.js
16. components/Mytextinput.js
