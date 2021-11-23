import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const ModalInput = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput placeholder="내용을 입력하세요" style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    margin: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
  },
});

export default ModalInput;
