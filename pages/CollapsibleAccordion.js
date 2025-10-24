// Import React hook để quản lý state
import { useState } from 'react';
// Import các component cơ bản từ React Native
import {
  SafeAreaView, // Container an toàn cho notch
  Switch, // Switch toggle component
  ScrollView, // Container có thể scroll
  StyleSheet, // API để tạo styles
  Text, // Hiển thị text
  View, // Container component
  TouchableOpacity, // Button có opacity effect
} from 'react-native';
// Import Animatable để tạo animations
import * as Animatable from 'react-native-animatable';
// Import Collapsible component cho single collapsible
import Collapsible from 'react-native-collapsible';
// Import Accordion component cho multiple collapsibles
import Accordion from 'react-native-collapsible/Accordion';

// Mảng content cho accordion (3 sections: T&C, Privacy, Return Policy)
const CONTENT = [
  {
    title: 'Terms and Conditions', // Tiêu đề section
    content: `The following terms and conditions, together
       with any referenced documents form a legal 
       agreement between you and your employer, employees,
       agents, contractors and any other entity on whose 
       behalf you accept these terms'`, // Nội dung section
  },
  {
    title: 'Privacy Policy',
    content: `A Privacy Policy agreement is the agreement where you
       specify if you collect personal data from your users,
       what kind of personal data you collect and what you do
       with that data.`,
  },
  {
    title: 'Return Policy',
    content: `Our Return & Refund Policy template lets you get 
       started with a Return and Refund Policy agreement. 
       This template is free to download and use. According to
       TrueShip study, over 60% of customers review a Return/Refund
       Policy before they make a purchasing decision.`,
  },
];

// Mảng selectors để chọn section nào sẽ expand
const SELECTORS = [
  { title: 'T&C', value: 0 }, // Selector cho Terms and Conditions (index 0)
  { title: 'Privacy Policy', value: 1 }, // Selector cho Privacy Policy (index 1)
  { title: 'Return Policy', value: 2 }, // Selector cho Return Policy (index 2)
  { title: 'Reset all' }, // Selector để reset tất cả (không có value)
];

const CollapsibleAccordion = () => {
  // State lưu mảng các sections đang được expand (array of indexes)
  const [activeSections, setActiveSections] = useState([]);
  // State kiểm tra single collapsible đang collapsed hay expanded
  const [collapsed, setCollapsed] = useState(true);
  // State kiểm tra có cho phép expand multiple sections cùng lúc không
  const [multipleSelect, setMultipleSelect] = useState(false);

  // Handler toggle collapsed state của single collapsible
  const toggleExpanded = () => {
    setCollapsed(!collapsed); // Toggle giữa true/false
  };

  // Handler set active sections cho accordion
  // Lọc bỏ undefined values (từ selector "Reset all")
  const setSections = (sections) => {
    // Nếu sections có undefined (từ "Reset all"), set empty array
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  // Function render header của mỗi accordion section
  // section: object chứa title và content
  // isActive: boolean kiểm tra section đang expand hay không
  const renderHeader = (section, _, isActive) => {
    return (
      // Animatable.View để animate background color khi expand/collapse
      <Animatable.View
        duration={400} // Animation duration 400ms
        // Style dựa vào isActive: active hoặc inactive
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor" // Animate backgroundColor
      >
        {/* Text hiển thị title của section */}
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  // Function render content của mỗi accordion section
  // section: object chứa title và content
  // isActive: boolean kiểm tra section đang expand hay không
  const renderContent = (section, _, isActive) => {
    return (
      // Animatable.View để animate content khi expand/collapse
      <Animatable.View
        duration={400} // Animation duration 400ms
        // Style dựa vào isActive: active hoặc inactive
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor" // Animate backgroundColor
      >
        {/* Animatable.Text với bounceIn animation khi expand */}
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined} // bounceIn nếu active
          style={{ textAlign: 'center' }} // Căn giữa text
        >
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
      // Container chính
      <View style={styles.container}>
        {/* ScrollView để scroll toàn bộ nội dung */}
        <ScrollView>
          {/* Text hiển thị title màn hình */}
          <Text style={styles.title}>
            Example of Collapsible/Accordion/Expandable Listview in React Native
          </Text>

          {/* TouchableOpacity làm header có thể click để toggle */}
          <TouchableOpacity onPress={toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Single Collapsible</Text>
            </View>
          </TouchableOpacity>
          
          {/* Collapsible component - single collapsible view */}
          <Collapsible 
            collapsed={collapsed} // Collapsed state từ useState
            align="center" // Align content ở giữa
          >
            {/* Content bên trong collapsible */}
            <View style={styles.content}>
              <Text style={{ textAlign: 'center' }}>
                This is a dummy text of Single Collapsible View
              </Text>
            </View>
          </Collapsible>

          {/* Divider line màu đen */}
          <View
            style={{
              backgroundColor: '#000', // Màu đen
              height: 1, // Chiều cao 1px
              marginTop: 10, // Margin trên
            }}
          />
          {/* View chứa Switch toggle cho multiple expand */}
          <View style={styles.multipleToggle}>
            {/* Label cho Switch */}
            <Text style={styles.multipleToggle__title}>
              Multiple Expand Allowed?
            </Text>
            {/* Switch component để toggle multiple select */}
            <Switch
              value={multipleSelect} // Value từ state
              // Handler khi switch toggle
              onValueChange={(multipleSelect) =>
                setMultipleSelect(multipleSelect) // Cập nhật state
              }
            />
          </View>
          
          {/* Text hướng dẫn user chọn selector */}
          <Text style={styles.selectTitle}>
            Please select below option to expand
          </Text>

          {/* View chứa các selector buttons */}
          <View style={styles.selectors}>
            {/* Map qua SELECTORS array và render button cho mỗi selector */}
            {SELECTORS.map((selector) => (
              // TouchableOpacity làm button có thể click
              <TouchableOpacity
                key={selector.title} // Key unique cho mỗi item
                // Handler khi click selector, set section tương ứng
                onPress={() => setSections([selector.value])}
              >
                <View style={styles.selector}>
                  {/* Text hiển thị title selector */}
                  <Text
                    // Apply style bold nếu section đang active
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }
                  >
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Accordion component cho multiple collapsibles */}
          <Accordion
            // Mảng indexes của sections đang active
            activeSections={activeSections}
            // Mảng data sections (CONTENT)
            sections={CONTENT}
            // Component dùng để wrap mỗi section (TouchableOpacity)
            touchableComponent={TouchableOpacity}
            // Cho phép expand multiple sections cùng lúc
            expandMultiple={multipleSelect}
            // Function render header của section
            renderHeader={renderHeader}
            // Function render content của section
            renderContent={renderContent}
            // Animation duration khi expand/collapse
            duration={400}
            // Handler được gọi khi active sections thay đổi
            onChange={setSections}
          />
        </ScrollView>
      </View>
  );
};

// Export component để sử dụng ở nơi khác
export default CollapsibleAccordion;

// StyleSheet định nghĩa các styles cho component
const styles = StyleSheet.create({
  // Style cho container chính
  container: {
    flex: 1, // Chiếm full màn hình
    backgroundColor: '#F5FCFF', // Màu nền xanh rất nhạt
    paddingTop: 30, // Padding trên
  },
  // Style cho title text
  title: {
    textAlign: 'center', // Căn giữa
    fontSize: 18, // Cỡ chữ vừa
    fontWeight: '300', // Font weight nhẹ
    marginBottom: 20, // Margin dưới
  },
  // Style cho header của collapsible/accordion
  header: {
    backgroundColor: '#F5FCFF', // Màu nền xanh nhạt
    padding: 10, // Padding bên trong
  },
  // Style cho text trong header
  headerText: {
    textAlign: 'center', // Căn giữa
    fontSize: 16, // Cỡ chữ vừa
    fontWeight: '500', // Font weight trung bình
  },
  // Style cho content của collapsible/accordion
  content: {
    padding: 20, // Padding bên trong
    backgroundColor: '#fff', // Màu nền trắng
  },
  // Style cho state active (expanded)
  active: {
    backgroundColor: 'rgba(255,255,255,1)', // Màu nền trắng
  },
  // Style cho state inactive (collapsed)
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)', // Màu nền xanh rất nhạt
  },
  // Style cho container chứa selectors
  selectors: {
    marginBottom: 10, // Margin dưới
    flexDirection: 'row', // Layout ngang
    justifyContent: 'center', // Căn giữa
  },
  // Style cho mỗi selector button
  selector: {
    backgroundColor: '#F5FCFF', // Màu nền xanh nhạt
    padding: 10, // Padding bên trong
  },
  // Style cho selector đang active
  activeSelector: {
    fontWeight: 'bold', // Chữ đậm
  },
  // Style cho select title text
  selectTitle: {
    fontSize: 14, // Cỡ chữ nhỏ
    fontWeight: '500', // Font weight trung bình
    padding: 10, // Padding xung quanh
    textAlign: 'center', // Căn giữa
  },
  // Style cho container chứa Switch toggle
  multipleToggle: {
    flexDirection: 'row', // Layout ngang
    justifyContent: 'center', // Căn giữa
    marginVertical: 30, // Margin trên dưới
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  // Style cho title của Switch toggle
  multipleToggle__title: {
    fontSize: 16, // Cỡ chữ vừa
    marginRight: 8, // Margin phải (space với Switch)
  },
});
