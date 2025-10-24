// Import React hooks để quản lý state và lifecycle
import React, {useState, useEffect} from 'react';
// Import các component cơ bản từ React Native
import {StyleSheet, Text, View} from 'react-native';
// Import component MultiSelect cho multi-select dropdown
import MultiSelect from 'react-native-multiple-select';

// Mảng dữ liệu tĩnh cho multi-select (danh sách social networks)
// Mỗi item phải có 'id' (unique) và 'name' (hiển thị)
const items = [
  {id: 1, name: 'angellist'},
  {id: 2, name: 'codepen'},
  {id: 3, name: 'envelope'},
  {id: 4, name: 'etsy'},
  {id: 5, name: 'facebook'},
  {id: 6, name: 'foursquare'},
  {id: 7, name: 'github-alt'},
  {id: 8, name: 'github'},
  {id: 9, name: 'gitlab'},
  {id: 10, name: 'instagram'},
];

const MultiSelectScreen = () => {
  // State lưu mảng các items đã được chọn (array of ids)
  const [selectedItems, setSelectedItems] = useState([]);

  // Handler được gọi khi user chọn/bỏ chọn items
  // Nhận mảng ids của các items đang được chọn
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems); // Cập nhật state với items mới
  };

  return (
      // Container chính chứa toàn bộ nội dung
      <View style={styles.container}>
        {/* Text hiển thị tiêu đề màn hình */}
        <Text style={styles.titleText}>
          Multiple Select
        </Text>
        
        {/* MultiSelect component cho phép chọn nhiều items */}
        <MultiSelect
          // Ẩn tags hiển thị các items đã chọn
          hideTags
          // Mảng data để hiển thị trong dropdown
          items={items}
          // Key unique để identify mỗi item (sử dụng 'id' field)
          uniqueKey="id"
          // Handler được gọi khi user chọn/bỏ chọn items
          onSelectedItemsChange={onSelectedItemsChange}
          // Mảng các items đang được chọn (controlled component)
          selectedItems={selectedItems}
          // Text hiển thị khi chưa chọn gì
          selectText="Pick Items"
          // Placeholder cho search input
          searchInputPlaceholderText="Search Items..."
          // Handler được gọi khi user gõ vào search box
          onChangeInput={(text) => console.log(text)} // Log text để debug
          // Màu icon X để remove tag
          tagRemoveIconColor="#CCC"
          // Màu border của tag
          tagBorderColor="#CCC"
          // Màu text của tag
          tagTextColor="#CCC"
          // Màu text của item đã được chọn trong dropdown
          selectedItemTextColor="#CCC"
          // Màu icon check của item đã chọn
          selectedItemIconColor="#CCC"
          // Màu text của items chưa chọn
          itemTextColor="#000"
          // Key trong object item để hiển thị (hiển thị 'name')
          displayKey="name"
          // Style cho search input
          searchInputStyle={{color: '#CCC'}}
          // Màu button Submit
          submitButtonColor="#48d22b"
          // Text của button Submit
          submitButtonText="Submit"
        />
      </View>
  );
};

// Export component để sử dụng ở nơi khác
export default MultiSelectScreen;

// StyleSheet định nghĩa các styles cho component
const styles = StyleSheet.create({
  // Style cho container chính
  container: {
    flex: 1, // Chiếm full màn hình
    backgroundColor: 'white', // Màu nền trắng
    padding: 10, // Padding xung quanh
  },
  // Style cho title text
  titleText: {
    padding: 8, // Padding xung quanh text
    fontSize: 16, // Cỡ chữ 16
    textAlign: 'center', // Căn giữa
    fontWeight: 'bold', // Chữ đậm
  },
  // Style cho heading text (không dùng trong component này)
  headingText: {
    padding: 8, // Padding xung quanh text
  },
});