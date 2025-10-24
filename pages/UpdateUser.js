import { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('UserDatabase.db');

const UpdateUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let updateAllStates = (name, contact, address) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
  };

  let searchUser = () => {
    console.log(inputUserId);
    try {
      const result = db.getFirstSync(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId]
      );
      if (result) {
        updateAllStates(
          result.user_name,
          result.user_contact,
          result.user_address
        );
      } else {
        alert('No user found');
        updateAllStates('', '', '');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      alert('Error searching user');
    }
  };

  let updateUser = () => {
    console.log(inputUserId, userName, userContact, userAddress);

    if (!inputUserId) {
      alert('Please fill User id');
      return;
    }
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    try {
      const result = db.runSync(
        'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
        [userName, userContact, userAddress, inputUserId]
      );
      console.log('Result:', result.changes);
      if (result.changes > 0) {
        Alert.alert(
          'Success',
          'User updated successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ],
          { cancelable: false }
        );
      } else {
        alert('Updation Failed');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Updation Failed');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            <Mytextinput
              placeholder="Enter User Id"
              style={{ padding: 10 }}
              onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            />
            <Mybutton title="Search User" customClick={searchUser} />
            <Mytextinput
              placeholder="Enter Name"
              value={userName}
              style={{ padding: 10 }}
              onChangeText={(userName) => setUserName(userName)}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              value={'' + userContact}
              onChangeText={(userContact) => setUserContact(userContact)}
              maxLength={10}
              style={{ padding: 10 }}
              keyboardType="numeric"
            />
            <Mytextinput
              value={userAddress}
              placeholder="Enter Address"
              onChangeText={(userAddress) => setUserAddress(userAddress)}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top', padding: 10 }}
            />
            <Mybutton title="Update User" customClick={updateUser} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default UpdateUser;
