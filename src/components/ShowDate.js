import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { images } from '../images';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function ShowDate(props) {
  //상단 날짜
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  if (month < 10) month = '0' + month;
  if (date < 10) date = '0' + date;
  const [topDate, setTopDate] = useState(year + '/' + month + '/' + date);

  useEffect(() => {
    props.submitTopDate(topDate);
  }, [topDate]);
  //date format 바꿔주는 함수
  Date.prototype.format = function (f) {
    if (!this.valueOf()) return ' ';

    var weekName = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
      switch ($1) {
        case 'yyyy':
          return d.getFullYear();
        case 'yy':
          return (d.getFullYear() % 1000).zf(2);
        case 'MM':
          return (d.getMonth() + 1).zf(2);
        case 'dd':
          return d.getDate().zf(2);
        case 'E':
          return weekName[d.getDay()];
        case 'HH':
          return d.getHours().zf(2);
        case 'hh':
          return ((h = d.getHours() % 12) ? h : 12).zf(2);
        case 'mm':
          return d.getMinutes().zf(2);
        case 'ss':
          return d.getSeconds().zf(2);
        case 'a/p':
          return d.getHours() < 12 ? '오전' : '오후';
        default:
          return $1;
      }
    });
  };

  String.prototype.string = function (len) {
    var s = '',
      i = 0;
    while (i++ < len) {
      s += this;
    }
    return s;
  };
  String.prototype.zf = function (len) {
    return '0'.string(len - this.length) + this;
  };
  Number.prototype.zf = function (len) {
    return this.toString().zf(len);
  };

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    // console.warn('dateFormat: ', date.format('yyyy/MM/dd'));
    hideDatePicker();
    setTopDate(date.format('yyyy/MM/dd'));
  };
  const decreaseDate = (topDate) => {
    var strArray = topDate.split('/');
    var year = parseInt(strArray[0]);
    var month = parseInt(strArray[1]);
    var date = parseInt(strArray[2]);
    var month31 = new Array(1, 3, 5, 7, 8, 10, 12);
    date = date - 1;
    if (date == 0 && month31.includes(month)) {
      date = 31;
      month = month - 1;
      if (month == 0) {
        year = year - 1;
        month = 12;
      }
    } else if (date == 0 && !month31.includes(month)) {
      date = 30;
      month = month - 1;
      if (month == 0) {
        year = year - 1;
        month = 12;
      }
    }

    if (month < 10) month = '0' + String(month);
    else month = String(month);
    if (date < 10) date = '0' + String(date);
    else date = String(date);

    var decreasedNewDate = String(year) + '/' + month + '/' + date;
    setTopDate(decreasedNewDate);
  };
  const increaseDate = (topDate) => {
    var strArray = topDate.split('/');
    var year = parseInt(strArray[0]);
    var month = parseInt(strArray[1]);
    var date = parseInt(strArray[2]);
    var month31 = new Array(1, 3, 5, 7, 8, 10, 12);
    var month30 = new Array(4, 6, 9, 11);
    date = date + 1;
    if (month == 2) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        //윤년
        if (date == 30) {
          date = 1;
          month++;
        }
      } else {
        if (date == 29) {
          date = 1;
          month++;
        }
      }
    } else if (month30.includes(month)) {
      if (date == 31) {
        date = 1;
        month = month + 1;
        if (month == 13) {
          year = year + 1;
          month = 1;
        }
      }
    } else if (month31.includes(month)) {
      if (date == 32) {
        date = 1;
        month = month + 1;
        if (month == 13) {
          year = year + 1;
          month = 1;
        }
      }
    }

    if (month < 10) month = '0' + String(month);
    else month = String(month);
    if (date < 10) date = '0' + String(date);
    else date = String(date);

    var increasedNewDate = String(year) + '/' + month + '/' + date;
    setTopDate(increasedNewDate);
  };

  return (
    <View style={dateStyle.container}>
      {/**날짜 선택 */}
      <TouchableOpacity onPress={showDatePicker}>
        <Image source={images.calendar} style={dateStyle.icon} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        ></DateTimePickerModal>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          decreaseDate(topDate);
        }}
      >
        <Image source={images.arrowleft} style={dateStyle.icon} />
      </TouchableOpacity>
      <Text style={dateStyle.contents}> {topDate}</Text>
      <TouchableOpacity
        onPress={() => {
          increaseDate(topDate);
        }}
      >
        <Image source={images.arrowright} style={dateStyle.icon} />
      </TouchableOpacity>
    </View>
  );
}

const dateStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    padding: 5,
    marginLeft: 0,
  },

  contents: {
    flex: 1,
    fontSize: 24,
    color: theme.text,
  },
  icon: {
    tintColor: theme.text,
    width: 30,
    height: 30,
    marginVertical: 7,
    marginHorizontal: 20,
  },
});
