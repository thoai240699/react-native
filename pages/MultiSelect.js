// Multiple Select / Dropdown / Picker Example in React Native
// https://aboutreact.com/multiple-select-dropdown-picker-example-in-react-native/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {StyleSheet, Text, View} from 'react-native';

// import MultiSelect library
import MultiSelect from 'react-native-multiple-select';

// Dummy Data for the MutiSelect
const items = [
  // name key is must. It is to show the text in front
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
  // Data Source for the SearchableDropdown
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Multiple Select
        </Text>
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
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#48d22b"
          submitButtonText="Submit"
        />
      </View>
  );
};

export default MultiSelectScreen;

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