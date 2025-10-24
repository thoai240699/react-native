// Import React hooks để quản lý state và lifecycle
import React, {useState, useEffect} from 'react';
// Import các component cơ bản từ React Native
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// Import component SearchableDropdown cho dropdown có search
import SearchableDropdown from 'react-native-searchable-dropdown';

// Mảng dữ liệu tĩnh cho dropdown đầu tiên (danh sách social networks)
// Mỗi item phải có 'name' property để SearchableDropdown hiển thị
const items = [
  {id: 1, name: 'angellist'}, // ID unique và tên để hiển thị
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
        const mappedData = data.map(book => ({
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
          // Handler được gọi khi user gõ text vào search box
          onTextChange={(text) => console.log(text)} // Log text để debug
          // Handler được gọi khi user chọn một item từ dropdown
          onItemSelect={(item) => alert(JSON.stringify(item))} // Alert hiển thị item đã chọn
          // Style cho container bọc dropdown
          containerStyle={{padding: 5}}
          // Style cho TextInput (ô search)
          textInputStyle={{
            padding: 12, // Padding bên trong
            borderWidth: 1, // Border 1px
            borderColor: '#ccc', // Màu border xám nhạt
            backgroundColor: '#FAF7F6', // Màu nền trắng ngà
          }}
          // Style cho mỗi item trong dropdown list
          itemStyle={{
            padding: 10, // Padding cho item
            marginTop: 2, // Khoảng cách giữa các items
            backgroundColor: '#FAF9F8', // Màu nền item
            borderColor: '#bbb', // Màu border
            borderWidth: 1, // Border 1px
          }}
          // Style cho text của item
          itemTextStyle={{
            color: '#222', // Màu text đen nhạt
          }}
          // Style cho container chứa list items
          itemsContainerStyle={{
            maxHeight: '60%', // Giới hạn chiều cao tối đa 60% màn hình
          }}
          // Mảng data để hiển thị trong dropdown
          items={items} // Sử dụng mảng items tĩnh
          // Index của item được chọn mặc định (2 = 'envelope')
          defaultIndex={2}
          // Placeholder text hiển thị khi chưa chọn gì
          placeholder="placeholder"
          // Reset value sau khi chọn (false = giữ value đã chọn)
          resPtValue={false}
          // Ẩn underline của TextInput trên Android
          underlineColorAndroid="transparent"
        />
        {/* Text hiển thị heading cho dropdown thứ hai */}
        <Text style={styles.headingText}>
          Searchable Dropdown from Dynamic Array from Server
        </Text>
        
        {/* SearchableDropdown component thứ hai - sử dụng data động từ server */}
        <SearchableDropdown
          // Handler được gọi khi user gõ text vào search box
          onTextChange={(text) => console.log(text)} // Log text để debug
          // Handler được gọi khi user chọn một item từ dropdown
          onItemSelect={(item) => alert(JSON.stringify(item))} // Alert hiển thị item đã chọn
          // Style cho container bọc dropdown
          containerStyle={{padding: 5}}
          // Style cho TextInput (ô search)
          textInputStyle={{
            padding: 12, // Padding bên trong
            borderWidth: 1, // Border 1px
            borderColor: '#ccc', // Màu border xám nhạt
            backgroundColor: '#FAF7F6', // Màu nền trắng ngà
          }}
          // Style cho mỗi item trong dropdown list
          itemStyle={{
            padding: 10, // Padding cho item
            marginTop: 2, // Khoảng cách giữa các items
            backgroundColor: '#FAF9F8', // Màu nền item
            borderColor: '#bbb', // Màu border
            borderWidth: 1, // Border 1px
          }}
          // Style cho text của item
          itemTextStyle={{
            color: '#222', // Màu text đen nhạt
          }}
          // Style cho container chứa list items
          itemsContainerStyle={{
            maxHeight: '50%', // Giới hạn chiều cao tối đa 50% màn hình
          }}
          // Mảng data để hiển thị trong dropdown (từ server)
          items={serverData} // Sử dụng state serverData được fetch từ API
          // Index của item được chọn mặc định
          defaultIndex={2}
          // Placeholder text hiển thị khi chưa chọn gì
          placeholder="placeholder"
          // Reset value sau khi chọn (false = giữ value đã chọn)
          resetValue={false}
          // Ẩn underline của TextInput trên Android
          underlineColorAndroid="transparent"
        />
      </View>
  );
};

// Export component để sử dụng ở nơi khác
export default SearchableDropdownScreen;

// StyleSheet định nghĩa các styles cho component
const styles = StyleSheet.create({
  // Style cho container chính
  container: {
    flex: 1, // Chiếm full màn hình
    backgroundColor: 'white', // Màu nền trắng
    padding: 10, // Padding xung quanh
  },
  // Style cho title text chính
  titleText: {
    padding: 8, // Padding xung quanh text
    fontSize: 16, // Cỡ chữ 16
    textAlign: 'center', // Căn giữa
    fontWeight: 'bold', // Chữ đậm
  },
  // Style cho heading text của mỗi dropdown
  headingText: {
    padding: 8, // Padding xung quanh text
  },
});