import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import ModalTextInput from './ModalTextInput';
import ModalDateInput from './ModalDateInput';
import ModalCategInput from './ModalCategInput';

const ModalAll = ({
  isVisible,
  hide,
  value,
  onChangeText,
  onSubmitEditing,
}) => {
  return (
    <View>
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>To-Do Detail Info</Text>
          <ModalTextInput
            text='To do : '
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
          <ModalDateInput text='Due Date : ' />
          <ModalCategInput text='Category : ' />
          <ModalTextInput text='Image : ' />
          <ModalTextInput text='Location : ' />
          <ModalTextInput text='Share : ' />
          <TouchableOpacity onPress={hide} style={{ backgroundColor: 'green' }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    margin: 10,
  },
});

export default ModalAll;
