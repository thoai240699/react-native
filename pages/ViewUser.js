import { useState } from 'react';
import { Text, View } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('UserDatabase.db');

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    try {
      const result = db.getFirstSync(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId]
      );
      if (result) {
        setUserData(result);
      } else {
        alert('No user found');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      alert('Error searching user');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <Mytextinput
          placeholder="Enter User Id"
          onChangeText={(inputUserId) => setInputUserId(inputUserId)}
          style={{ padding: 10 }}
        />
        <Mybutton title="Search User" customClick={searchUser} />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>User Id: {userData.user_id}</Text>
          <Text>User Name: {userData.user_name}</Text>
          <Text>User Contact: {userData.user_contact}</Text>
          <Text>User Address: {userData.user_address}</Text>
        </View>
      </View>
    </View>
  );
};

export default ViewUser;
