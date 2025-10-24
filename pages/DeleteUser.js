import { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('UserDatabase.db');

const DeleteUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = () => {
    try {
      const result = db.runSync('DELETE FROM  table_user where user_id=?', [
        inputUserId,
      ]);
      console.log('Result:', result.changes);
      if (result.changes > 0) {
        Alert.alert(
          'Success',
          'User deleted successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ],
          { cancelable: false }
        );
      } else {
        alert('Please insert a valid User Id');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
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
        <Mybutton title="Delete User" customClick={deleteUser} />
      </View>
    </View>
  );
};

export default DeleteUser;
