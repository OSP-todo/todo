import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';

const ModalCategInput = ({ text }) => {
  const [checked, setChecked] = useState('work');
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <View style={styles.category}>
        <Text>Work</Text>
        <RadioButton
          value='work'
          status={checked === 'work' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('work')}
        />
        <Text>Life</Text>
        <RadioButton
          value='life'
          status={checked === 'life' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('life')}
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
