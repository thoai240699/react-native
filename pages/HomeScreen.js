import { useEffect } from 'react';
import { View, Text } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('UserDatabase.db');

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    try {
      db.execSync(
        'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))'
      );
      console.log('Database initialized');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <Mytext text="Demo" />
        <Mybutton
          title="CollapsibleAccordion"
          customClick={() => navigation.navigate('CollapsibleAccordion')}
        />
        <Mybutton
          title="SearchableDropdown"
          customClick={() => navigation.navigate('SearchableDropdown')}
        />
        <Mybutton
          title="MultiSelect"
          customClick={() => navigation.navigate('MultiSelect')}
        />
       <Mybutton
          title="DatePicker"
          customClick={() => navigation.navigate('DatePicker')}
        />
        <Mybutton
          title="CalendarPicker"
          customClick={() => navigation.navigate('CalendarPicker')}
        />
         <Mybutton
          title="EventCalendar"
          customClick={() => navigation.navigate('EventCalendar')}
        />
         <Mybutton
          title="AddCalendarEvent"
          customClick={() => navigation.navigate('AddCalendarEvent')}
        />

        <Mytext text="Demo sqlite" />
        <Mybutton
          title="Register"
          customClick={() => navigation.navigate('Register')}
        />
        <Mybutton
          title="Update"
          customClick={() => navigation.navigate('Update')}
        />
        <Mybutton
          title="View"
          customClick={() => navigation.navigate('View')}
        />
        <Mybutton
          title="View All"
          customClick={() => navigation.navigate('ViewAll')}
        />
        <Mybutton
          title="Delete"
          customClick={() => navigation.navigate('Delete')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
