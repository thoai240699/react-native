import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

// Mảng dữ liệu tĩnh cho multi-select (danh sách social networks)
// Mỗi item phải có 'id' (unique) và 'name' (hiển thị)
const items = [
  { id: 1, name: 'angellist' },
  { id: 2, name: 'codepen' },
  { id: 3, name: 'envelope' },
  { id: 4, name: 'etsy' },
  { id: 5, name: 'facebook' },
  { id: 6, name: 'foursquare' },
  { id: 7, name: 'github-alt' },
  { id: 8, name: 'github' },
  { id: 9, name: 'gitlab' },
  { id: 10, name: 'instagram' },
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
      <Text style={styles.titleText}>Multiple Select</Text>

      {/* MultiSelect component cho phép chọn nhiều items */}
      <MultiSelect
        hideTags
        items={items}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Pick Items"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#48d22b"
        submitButtonText="Submit"
      />
    </View>
  );
};

// Export component để sử dụng ở nơi khác
export default MultiSelectScreen;

// StyleSheet định nghĩa các styles cho component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});
