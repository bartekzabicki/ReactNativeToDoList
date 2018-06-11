import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Calendar } from "react-native-calendars";

class MyCalendar extends Component {
  render() {
    return (
      <Calendar
        style={{
          height: 350
        }}
        onDayPress={(day) => {
          console.log(day)
        }}
        markedDates={{
            '2018-05-16': {marked: true},
            '2018-05-16': {marked: true},
            '2018-05-16': {marked: true},
            '2018-05-17': {marked: true},
            '2018-05-18': {marked: true, dotColor: 'red', activeOpacity: 0}
          }}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "#34495e",
          monthTextColor: "#34495e",
          textMonthFontWeight: "bold",
          textDayFontSize: 14,
          textMonthFontSize: 14,
          textDayHeaderFontSize: 14
        }}
      />
    );
  }
}
export default MyCalendar;