import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import dateFormat from 'dateformat';

export default class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      pointing: [],
      workHour: null,
      overtime: null,
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  async onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    try {
      AsyncStorage.getItem('authToken').then(async value => {
        if (value) {
          const response = await axios.post(
            'http://10.0.2.2:8080/api/user/pointing/week',
            {date: dateFormat(date, 'yyyy-mm-dd')},
            {headers: {Authorization: 'Bearer ' + value}},
          );
          console.log(response.data);
          this.setState({
            pointing: response.data.data.pointingList,
            workHour: response.data.data.workingHour,
            overtime: response.data.data.overtime,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {selectedStartDate, pointing, workHour, overtime} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <SafeAreaView style={styles.container}>
        <Text></Text>
        <CalendarPicker onDateChange={this.onDateChange} />

        <View>
          <Text>SELECTED DATE: {startDate}</Text>
          <Text>Work HOUR ON WEEK: {workHour}</Text>
          <Text>OVERTIME ON WEEK: {overtime}</Text>
          <FlatList
            data={pointing}
            renderItem={({item}) => (
              <View>
                <Text>
                  Start Date:{' '}
                  {dateFormat(item.startDate, 'yyyy-mm-dd HH:MM:ss')}
                </Text>
                <Text>
                  End Date: {dateFormat(item.endDate, 'yyyy-mm-dd HH:MM:ss')}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});
