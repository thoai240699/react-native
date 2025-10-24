// Add Event in Device's Calendar from React Native App for Android and iOS
// https://aboutreact.com/react-native-add-event-in-device-calendar/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

//Import library for Calendar Events
import * as Calendar from 'expo-calendar';

//Import moment.js to deal with time
import moment from 'moment';

const EVENT_TITLE = 'Lunch';
const TIME_NOW_IN_UTC = moment.utc();

const AddCalendarEventScreen = () => {
  const [text, setText] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const [lastEventId, setLastEventId] = useState('');
  const [calendarId, setCalendarId] = useState(null);

  useEffect(() => {
    requestCalendarPermission();
  }, []);

  const requestCalendarPermission = async () => {
    try {
      const {status} = await Calendar.requestCalendarPermissionsAsync();
      
      if (status === 'granted') {
        setHasPermission(true);
        
        // Get default calendar
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Available calendars:', calendars);
        
        if (calendars.length > 0) {
          const primaryCalendar = calendars.find(cal => cal.isPrimary) || calendars[0];
          setCalendarId(primaryCalendar.id);
          Alert.alert('Success', `Calendar permissions granted!\nUsing: ${primaryCalendar.title}`);
        } else {
          Alert.alert('Warning', 'No calendars found on device');
        }
      } else {
        setHasPermission(false);
        Alert.alert('Error', 'Calendar permissions denied!');
      }
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert('Error', 'Failed to request permissions: ' + error.message);
    }
  };

  const addToCalendar = async () => {
    if (!hasPermission) {
      Alert.alert('Error', 'Calendar permission not granted');
      return;
    }

    if (!calendarId) {
      Alert.alert('Error', 'No calendar available');
      return;
    }

    try {
      const startDate = moment.utc(TIME_NOW_IN_UTC).toDate();
      const endDate = moment.utc(TIME_NOW_IN_UTC).add(1, 'hours').toDate();

      const eventDetails = {
        title: EVENT_TITLE,
        startDate: startDate,
        endDate: endDate,
        notes: 'Tasty lunch event!',
        location: 'Restaurant XYZ',
        timeZone: 'Asia/Ho_Chi_Minh',
        alarms: [{
          relativeOffset: -15, // 15 minutes before
        }],
      };

      console.log('Creating event with:', eventDetails);
      const eventId = await Calendar.createEventAsync(calendarId, eventDetails);
      
      setLastEventId(eventId);
      Alert.alert(
        'Success',
        `Event created successfully!\nEvent ID: ${eventId}\n\nCheck your device calendar app.`
      );
    } catch (error) {
      console.error('Add event error:', error);
      Alert.alert('Error', `Failed to add event: ${error.message}`);
    }
  };

  const editCalendarEvent = async (eventId) => {
    if (!eventId) {
      Alert.alert('Error', 'Please insert Event ID');
      return;
    }

    if (!hasPermission) {
      Alert.alert('Error', 'Calendar permission not granted');
      return;
    }

    try {
      const startDate = moment.utc(TIME_NOW_IN_UTC).toDate();
      const endDate = moment.utc(TIME_NOW_IN_UTC).add(2, 'hours').toDate();

      const eventDetails = {
        title: EVENT_TITLE + ' (Edited)',
        startDate: startDate,
        endDate: endDate,
        notes: 'Updated lunch event!',
        location: 'New Restaurant ABC',
      };

      await Calendar.updateEventAsync(eventId, eventDetails);
      Alert.alert('Success', 'Event updated successfully!');
    } catch (error) {
      console.error('Edit event error:', error);
      Alert.alert('Error', `Failed to edit event: ${error.message}`);
    }
  };

  const viewCalendarEvent = async (eventId) => {
    if (!eventId) {
      Alert.alert('Error', 'Please insert Event ID');
      return;
    }

    if (!hasPermission) {
      Alert.alert('Error', 'Calendar permission not granted');
      return;
    }

    try {
      const event = await Calendar.getEventAsync(eventId);
      
      if (event) {
        const eventDetails = `
Title: ${event.title}
Start: ${moment(event.startDate).format('lll')}
End: ${moment(event.endDate).format('lll')}
Location: ${event.location || 'N/A'}
Notes: ${event.notes || 'N/A'}
Calendar: ${event.calendarId}
        `;
        Alert.alert('Event Details', eventDetails);
      } else {
        Alert.alert('Error', 'Event not found');
      }
    } catch (error) {
      console.error('View event error:', error);
      Alert.alert('Error', `Failed to view event: ${error.message}`);
    }
  };

  const deleteCalendarEvent = async (eventId) => {
    if (!eventId) {
      Alert.alert('Error', 'Please insert Event ID');
      return;
    }

    if (!hasPermission) {
      Alert.alert('Error', 'Calendar permission not granted');
      return;
    }

    try {
      await Calendar.deleteEventAsync(eventId);
      Alert.alert('Success', 'Event deleted successfully!');
      if (lastEventId === eventId) {
        setLastEventId('');
      }
      setText('');
    } catch (error) {
      console.error('Delete event error:', error);
      Alert.alert('Error', `Failed to delete event: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.titleStyle}>
            Add Event in Device's Calendar from React Native App
          </Text>

          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              Permission: {hasPermission ? '✓ Granted' : '✗ Denied'}
            </Text>
            <Text style={styles.permissionText}>
              Calendar: {calendarId ? '✓ Found' : '✗ Not Found'}
            </Text>
            {!hasPermission && (
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={requestCalendarPermission}>
                <Text style={styles.buttonTextStyle}>Request Permission</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>
              Event title: {EVENT_TITLE}
              {'\n'}
              Event Date Time: {moment.utc(TIME_NOW_IN_UTC).local().format('lll')}
            </Text>
            <TouchableOpacity
              style={[styles.buttonStyle, {minWidth: '100%'}]}
              onPress={addToCalendar}
              disabled={!hasPermission || !calendarId}>
              <Text style={styles.buttonTextStyle}>Add Event to Calendar</Text>
            </TouchableOpacity>
          </View>

          {lastEventId ? (
            <View style={styles.eventIdContainer}>
              <Text style={styles.eventIdText}>Last Event ID:</Text>
              <Text style={styles.eventIdValue}>{lastEventId}</Text>
            </View>
          ) : null}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manage Event by ID</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter event ID or use last created ID"
              placeholderTextColor="#999"
              onChangeText={(text) => setText(text)}
              value={text}
            />
            {lastEventId && !text && (
              <TouchableOpacity
                style={styles.useLastButton}
                onPress={() => setText(lastEventId)}>
                <Text style={styles.useLastText}>Use Last Event ID</Text>
              </TouchableOpacity>
            )}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.buttonHalfStyle}
                onPress={() => editCalendarEvent(text || lastEventId)}
                disabled={!hasPermission}>
                <Text style={styles.buttonTextStyle}>Edit Event</Text>
              </TouchableOpacity>
              <View style={{width: 10}} />
              <TouchableOpacity
                style={styles.buttonHalfStyle}
                onPress={() => viewCalendarEvent(text || lastEventId)}
                disabled={!hasPermission}>
                <Text style={styles.buttonTextStyle}>View Event</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.deleteButton, {minWidth: '100%'}]}
              onPress={() => deleteCalendarEvent(text || lastEventId)}
              disabled={!hasPermission}>
              <Text style={styles.buttonTextStyle}>Delete Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCalendarEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307ecc',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  permissionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  permissionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  permissionButton: {
    backgroundColor: '#f5821f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 5,
  },
  buttonStyle: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#f5821f',
    marginTop: 10,
    borderRadius: 5,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonHalfStyle: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f5821f',
    borderRadius: 5,
    elevation: 2,
  },
  inputStyle: {
    height: 50,
    width: '100%',
    marginTop: 10,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 16,
  },
  useLastButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  useLastText: {
    color: '#f5821f',
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventIdContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  eventIdText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  eventIdValue: {
    color: '#f5821f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});