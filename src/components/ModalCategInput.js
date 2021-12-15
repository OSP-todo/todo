import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const ModalCategInput = ({ text, submitCategory }) => {
  const [checked, setChecked] = useState('Work');
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <View style={styles.category}>
        <Text>Work</Text>
        <RadioButton
          value='Work'
          status={checked === 'Work' ? 'checked' : 'unchecked'}
          onPress={() => {setChecked('Work');}}
        />
        <Text>Life</Text>
        <RadioButton
          value='Life'
          status={checked === 'Life' ? 'checked' : 'unchecked'}
          onPress={() => {setChecked('Life');}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  category: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default ModalCategInput;
