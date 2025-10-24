import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

// Mảng dữ liệu tĩnh cho dropdown đầu tiên (danh sách social networks)
// Mỗi item phải có 'name' property để SearchableDropdown hiển thị
const items = [
  { id: 1, name: 'angellist' }, // ID unique và tên để hiển thị
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

const SearchableDropdownScreen = () => {
  // State lưu dữ liệu động được fetch từ server (danh sách books)
  const [serverData, setServerData] = useState([]);

  // Hook chạy một lần khi component mount để fetch data từ API
  useEffect(() => {
    // Gọi API để lấy danh sách books
    fetch('https://68f48234b16eb6f46834baaf.mockapi.io/api/v1/bookstore')
      .then((response) => response.json()) // Parse response thành JSON
      .then((data) => {
        // Transform data để phù hợp với format của SearchableDropdown
        // Lấy booksName và map thành 'name' property
        const mappedData = data.map((book) => ({
          name: book.booksName, // SearchableDropdown yêu cầu property 'name'
        }));
        setServerData(mappedData); // Cập nhật state với data đã transform
      })
      .catch((error) => {
        // Bắt lỗi nếu fetch thất bại
        console.error(error); // Log error để debug
        setServerData([]); // Set empty array nếu lỗi
      });
  }, []); // Dependency array rỗng = chỉ chạy 1 lần khi mount

  return (
    // Container chính chứa toàn bộ nội dung
    <View style={styles.container}>
      {/* Text hiển thị tiêu đề chính của màn hình */}
      <Text style={styles.titleText}>
        Example of Searchable Dropdown / Picker in React Native
      </Text>

      {/* Text hiển thị heading cho dropdown đầu tiên */}
      <Text style={styles.headingText}>
        Searchable Dropdown from Static Array
      </Text>

      {/* SearchableDropdown component thứ nhất - sử dụng data tĩnh từ items array */}
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        onItemSelect={(item) => alert(JSON.stringify(item))}
        containerStyle={{ padding: 5 }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: '#FAF7F6',
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#FAF9F8',
          borderColor: '#bbb',
          borderWidth: 1,
        }}
        itemTextStyle={{
          color: '#222',
        }}
        itemsContainerStyle={{
          maxHeight: '60%',
        }}
        items={items}
        defaultIndex={2}
        placeholder="placeholder"
        resPtValue={false}
        underlineColorAndroid="transparent"
      />
      {/* Text hiển thị heading cho dropdown thứ hai */}
      <Text style={styles.headingText}>
        Searchable Dropdown from Dynamic Array from Server
      </Text>

      {/* SearchableDropdown component thứ hai - sử dụng data động từ server */}
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        onItemSelect={(item) => alert(JSON.stringify(item))}
        containerStyle={{ padding: 5 }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: '#FAF7F6',
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#FAF9F8',
          borderColor: '#bbb',
          borderWidth: 1,
        }}
        itemTextStyle={{
          color: '#222',
        }}
        itemsContainerStyle={{
          maxHeight: '50%',
        }}
        items={serverData}
        defaultIndex={2}
        placeholder="placeholder"
        resetValue={false}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

// Export component để sử dụng ở nơi khác
export default SearchableDropdownScreen;

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
