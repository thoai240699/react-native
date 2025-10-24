// Import React hooks: useState quản lý state, useEffect cho lifecycle, useRef cho references
import React, {useState, useEffect, useRef} from 'react';
// Import các component cơ bản từ React Native
import {
  StyleSheet, // Tạo stylesheet cho styling
  Text, // Component hiển thị text
  View, // Container cơ bản
  TouchableOpacity, // Button có hiệu ứng nhấn
  ScrollView, // View có thể scroll
} from 'react-native';
// Import DateTimePicker từ community package để chọn ngày/giờ
import DateTimePicker from '@react-native-community/datetimepicker';
// Import moment để xử lý và format thời gian
import moment from 'moment';

const DatePickerScreen = () => {
  // State lưu ngày được chọn, mặc định là 24/10/2025
  const [date, setDate] = useState(new Date('2025-10-24'));
  // State lưu giờ được chọn, mặc định là thời gian hiện tại
  const [time, setTime] = useState(new Date());
  // State kiểm soát việc hiển thị date picker
  const [showDate, setShowDate] = useState(false);
  // State kiểm soát việc hiển thị time picker
  const [showTime, setShowTime] = useState(false);
  // State lưu tổng thời gian countdown tính bằng giây
  const [totalDuration, setTotalDuration] = useState(0);
  // useRef để lưu interval ID của countdown, không trigger re-render
  const intervalRef = useRef(null);

  // State kiểm soát timer có đang chạy không
  const [isTimerStart, setIsTimerStart] = useState(false);
  // State kiểm soát stopwatch có đang chạy không
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  // State lưu số giây còn lại của timer (mặc định 90 giây)
  const [timerSeconds, setTimerSeconds] = useState(90);
  // State lưu milliseconds của stopwatch
  const [stopwatchMs, setStopwatchMs] = useState(0);
  // useRef lưu interval ID của timer
  const timerIntervalRef = useRef(null);
  // useRef lưu interval ID của stopwatch
  const stopwatchIntervalRef = useRef(null);

  // Hook chạy một lần khi component mount để calculate countdown duration
  useEffect(() => {
    // Lấy current date với UTC offset +07:00 (timezone Việt Nam)
    let currentDate = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
    // Ngày expiry cố định (target date cho countdown)
    let expirydate = '2025-10-24 04:00:45';
    
    // Tính duration (khoảng thời gian) giữa expiry date và current date
    let diffr = moment.duration(moment(expirydate).diff(moment(currentDate)));
    // Lấy hours, minutes, seconds từ duration
    var hours = parseInt(diffr.asHours()); // Tổng số giờ
    var minutes = parseInt(diffr.minutes()); // Phút còn lại (0-59)
    var seconds = parseInt(diffr.seconds()); // Giây còn lại (0-59)

    // Convert tất cả về seconds (total duration)
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    // Set total duration, nếu âm thì set 0 (đã hết hạn)
    setTotalDuration(Math.max(0, d));
  }, []); // Dependency rỗng = chỉ chạy 1 lần khi mount

  // Hook start countdown interval khi totalDuration > 0
  useEffect(() => {
    // Chỉ start interval nếu total duration còn lớn hơn 0
    if (totalDuration > 0) {
      // Tạo interval giảm totalDuration mỗi giây
      intervalRef.current = setInterval(() => {
        setTotalDuration(prev => {
          // Nếu countdown <= 1 giây
          if (prev <= 1) {
            clearInterval(intervalRef.current); // Clear interval
            alert('Countdown finished!'); // Alert thông báo countdown xong
            return 0; // Set về 0
          }
          return prev - 1; // Giảm 1 giây
        });
      }, 1000); // Chạy mỗi 1000ms (1 giây)
    }

    // Cleanup function khi component unmount hoặc totalDuration thay đổi
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear interval để tránh memory leak
      }
    };
  }, [totalDuration]); // Chạy lại khi totalDuration thay đổi

  // Hook quản lý timer interval
  useEffect(() => {
    // Nếu timer đang chạy và còn time
    if (isTimerStart && timerSeconds > 0) {
      // Tạo interval giảm timerSeconds mỗi giây
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          // Nếu timer <= 1 giây
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current); // Clear interval
            setIsTimerStart(false); // Stop timer
            alert('Timer Completed!'); // Alert thông báo timer xong
            return 0; // Set về 0
          }
          return prev - 1; // Giảm 1 giây
        });
      }, 1000); // Chạy mỗi 1000ms (1 giây)
    } else if (!isTimerStart && timerIntervalRef.current) {
      // Nếu timer bị stop, clear interval
      clearInterval(timerIntervalRef.current);
    }

    // Cleanup function khi component unmount hoặc dependencies thay đổi
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current); // Clear interval để tránh memory leak
      }
    };
  }, [isTimerStart, timerSeconds]); // Chạy lại khi isTimerStart hoặc timerSeconds thay đổi

  useEffect(() => {
    if (isStopwatchStart) {
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchMs(prev => prev + 10);
      }, 10);
    } else if (!isStopwatchStart && stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
    }

    return () => {
      if (stopwatchIntervalRef.current) {
        clearInterval(stopwatchIntervalRef.current);
      }
    };
  }, [isStopwatchStart]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatCountdown = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
    };
  };

  const formatTimerDisplay = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatStopwatchDisplay = (totalMs) => {
    const mins = Math.floor(totalMs / 60000);
    const secs = Math.floor((totalMs % 60000) / 1000);
    const ms = Math.floor((totalMs % 1000) / 10);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
  };

  const onDateChange = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate) {
      setDate(selectedDate);
      updateCountdown(selectedDate, time);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTime(false);
    if (selectedTime) {
      setTime(selectedTime);
      updateCountdown(date, selectedTime);
    }
  };

  const updateCountdown = (selectedDate, selectedTime) => {
    const combinedDateTime = moment(selectedDate)
      .hours(selectedTime.getHours())
      .minutes(selectedTime.getMinutes())
      .seconds(0);

    const currentDateTime = moment().utcOffset('+07:00');
    const duration = moment.duration(combinedDateTime.diff(currentDateTime));

    if (duration.asSeconds() > 0) {
      const hours = parseInt(duration.asHours());
      const minutes = parseInt(duration.minutes());
      const seconds = parseInt(duration.seconds());
      const durationInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
      setTotalDuration(durationInSeconds);
    } else {
      setTotalDuration(0);
    }
  };

  const handleTimerStartStop = () => {
    setIsTimerStart(!isTimerStart);
  };

  const handleTimerReset = () => {
    setIsTimerStart(false);
    setTimerSeconds(90);
  };

  const handleStopwatchStartStop = () => {
    setIsStopwatchStart(!isStopwatchStart);
  };

  const handleStopwatchReset = () => {
    setIsStopwatchStart(false);
    setStopwatchMs(0);
  };

  const countdown = formatCountdown(totalDuration);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          React Native Date & Time Picker, CountDown Timer, Timer & Stopwatch
        </Text>
        
        {/* Date & Time Picker Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time Picker</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDate(true)}
          >
            <Text style={styles.dateText}>Date: {formatDate(date)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowTime(true)}
          >
            <Text style={styles.dateText}>Time: {formatTime(time)}</Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              minimumDate={new Date('2016-01-01')}
              maximumDate={new Date('2050-01-01')}
              onChange={onDateChange}
            />
          )}

          {showTime && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>

        {/* Custom CountDown Component */}
        <View style={styles.countdownContainer}>
          <Text style={styles.sectionTitle}>Countdown Timer</Text>
          {totalDuration > 0 ? (
            <View style={styles.timerRow}>
              <View style={styles.timeBlock}>
                <View style={styles.digitBox}>
                  <Text style={styles.digitText}>{countdown.hours}</Text>
                </View>
                <Text style={styles.label}>Hours</Text>
              </View>
              
              <Text style={styles.separator}>:</Text>
              
              <View style={styles.timeBlock}>
                <View style={styles.digitBox}>
                  <Text style={styles.digitText}>{countdown.minutes}</Text>
                </View>
                <Text style={styles.label}>Minutes</Text>
              </View>
              
              <Text style={styles.separator}>:</Text>
              
              <View style={styles.timeBlock}>
                <View style={styles.digitBox}>
                  <Text style={styles.digitText}>{countdown.seconds}</Text>
                </View>
                <Text style={styles.label}>Seconds</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.expiredText}>Time Expired!</Text>
          )}
        </View>

        {/* Stopwatch Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stopwatch</Text>
          <View style={styles.stopwatchContainer}>
            <Text style={styles.stopwatchText}>
              {formatStopwatchDisplay(stopwatchMs)}
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleStopwatchStartStop}>
              <Text style={styles.buttonText}>
                {!isStopwatchStart ? 'START' : 'STOP'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.controlButton, styles.resetButton]}
              onPress={handleStopwatchReset}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timer (90 seconds)</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {formatTimerDisplay(timerSeconds)}
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleTimerStartStop}>
              <Text style={styles.buttonText}>
                {!isTimerStart ? 'START' : 'STOP'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.controlButton, styles.resetButton]}
              onPress={handleTimerReset}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DatePickerScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#555',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateButton: {
    width: '100%',
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dateText: {
    textAlign: 'center',
    fontSize: 16,
  },
  countdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 20,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBlock: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  digitBox: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  digitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  separator: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginHorizontal: 5,
  },
  expiredText: {
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  stopwatchContainer: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    width: 220,
    alignItems: 'center',
    alignSelf: 'center',
  },
  stopwatchText: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  timerContainer: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: 220,
    alignItems: 'center',
    alignSelf: 'center',
  },
  timerText: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 15,
  },
  controlButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});