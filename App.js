import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';
import CollapsibleAccordion from './pages/CollapsibleAccordion'
import SearchableDropdownScreen from './pages/SearchableDropdown'
import MultiSelectScreen from './pages/MultiSelect'
import DatePickerScreen from './pages/DatePicker'
import CalendarPickerScreen from './pages/CalendarPicker'
import EventCalendarScreen from './pages/EventCalendar'
import AddCalendarEventScreen from './pages/AddCalendarEvent'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
          <Stack.Screen
          name="CollapsibleAccordion"
          component={CollapsibleAccordion}
          options={{
            title: 'CollapsibleAccordion',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />          
        <Stack.Screen
          name="SearchableDropdown"
          component={SearchableDropdownScreen}
          options={{
            title: 'SearchableDropdown',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="MultiSelect"
          component={MultiSelectScreen}
          options={{
            title: 'MultiSelect',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="DatePicker"
          component={DatePickerScreen}
          options={{
            title: 'DatePicker',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="CalendarPicker"
          component={CalendarPickerScreen}
          options={{
            title: 'CalendarPicker',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="EventCalendar"
          component={EventCalendarScreen}
          options={{
            title: 'EventCalendar',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddCalendarEvent"
          component={AddCalendarEventScreen}
          options={{
            title: 'AddCalendarEvent',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewUser}
          options={{
            title: 'View User',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: 'View Users',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: 'Update User',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Register User',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: 'Delete User',
            headerStyle: {
              backgroundColor: '#06b4f8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
