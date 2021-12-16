import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

const ModalDateInput = ({ text, submitDueDate }) => {
  //오늘 날짜가 기본으로 뜨도록
  var today = new Date();
  var year = today.getFullYear();
  var month = (today.getMonth()+1);
  var date = today.getDate();
  if(month < 10) month = '0' + month;
  if(date < 10) date = '0' + date;
  const [dateText, onChangeDateText] = useState(year + "/" + month  + "/" + date);
  
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
    onChangeDateText(date.format('yyyy/MM/dd'));
  };

  useEffect(() => {
    submitDueDate(dateText);
  },[dateText]);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text>{dateText}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        ></DateTimePickerModal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  dateButton: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  input: { width: '100%', borderWidth: 1, padding: 5 },
});

export default ModalDateInput;
