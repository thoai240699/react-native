// Example of Calendar with Events Listed in React Native
// https://aboutreact.com/example-of-calendar-with-events-listed-in-react-native/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

//import Calendar component
import {Calendar, LocaleConfig} from 'react-native-calendars';

const EventCalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('2025-01-01');
  
  const events = {
    '2025-01-01': [
      {
        start: '2025-01-01 00:00:00',
        end: '2025-01-01 02:00:00',
        title: 'New Year Party',
        summary: 'xyz Location',
      },
      {
        start: '2025-01-01 01:00:00',
        end: '2025-01-01 02:00:00',
        title: 'New Year Wishes',
        summary: 'Call to every one',
      },
    ],
    '2025-01-02': [
      {
        start: '2025-01-02 00:30:00',
        end: '2025-01-02 01:30:00',
        title: 'Parag Birthday Party',
        summary: 'Call him',
      },
    ],
    '2025-01-03': [
      {
        start: '2025-01-03 01:30:00',
        end: '2025-01-03 02:20:00',
        title: 'My Birthday Party',
        summary: 'Lets Enjoy',
      },
    ],
    '2025-02-04': [
      {
        start: '2025-02-04 04:10:00',
        end: '2025-02-04 04:40:00',
        title: 'Engg Expo 2025',
        summary: 'Expo Venue not confirm',
      },
    ],
  };

  // Create marked dates object for calendar
  const markedDates = {};
  Object.keys(events).forEach(date => {
    markedDates[date] = {
      marked: true,
      dotColor: '#007AFF',
      selected: date === selectedDate,
      selectedColor: '#007AFF',
    };
  });

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const eventClicked = (event) => {
    alert(JSON.stringify(event, null, 2));
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const selectedEvents = events[selectedDate] || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Calendar with Events</Text>
        
        <Calendar
          current={selectedDate}
          onDayPress={onDayPress}
          markedDates={markedDates}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#007AFF',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#007AFF',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#007AFF',
            selectedDotColor: '#ffffff',
            arrowColor: '#007AFF',
            monthTextColor: '#2d4150',
            indicatorColor: '#007AFF',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />

        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>
            Events for {selectedDate}
          </Text>
          <ScrollView style={styles.eventsList}>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.eventCard}
                  onPress={() => eventClicked(event)}
                >
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventTime}>
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </Text>
                  </View>
                  <Text style={styles.eventSummary}>{event.summary}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noEventsContainer}>
                <Text style={styles.noEventsText}>
                  No events for this date
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    color: '#333',
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    paddingTop: 15,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#555',
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  eventCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  eventTime: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  eventSummary: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noEventsText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});