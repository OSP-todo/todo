import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import ModalTextInput from './ModalTextInput';
import ModalDateInput from './ModalDateInput';
import ModalCategInput from './ModalCategInput';
import { theme } from '../theme';

const ModalAll = (props) => {
  const _taskSubmit = () => {
    props.hide(); //모달 숨기기
    props.onSubmitEditing(); //새로운 task 내용 보내기
    //props.submitCategory('Work');
  };
  return (
    <View>
      <Modal visible={props.isVisible} transparent={true}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>To-Do Detail Info</Text>
          <ModalTextInput
            text='To do : '
            value={props.value}
            onChangeText={props.onChangeText}
            onSubmitEditing={props.onSubmitEditing}
          />
          <ModalDateInput
            text='Due Date : '
            submitDueDate={props.submitDueDate}
          />
          <ModalCategInput
            text='Category : '
            submitCategory={props.submitCategory}
          />
          {/* <ModalTextInput text='Image : ' />
          <ModalTextInput text='Location : ' />
          <ModalTextInput text='Share : ' /> */}
          <View style={styles.buttonStyle}>
            <TouchableOpacity
              onPress={_taskSubmit}
              style={{
                padding: 5,
                margin: 5,
                paddingHorizontal: 15,
                borderRadius: 10,
                backgroundColor: theme.itemBackground,
              }}
            >
              <Text>{props.isNew ? 'Submit' : 'Update'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.hide()}
              style={{
                padding: 5,
                margin: 5,
                paddingHorizontal: 15,
                borderRadius: 10,
                backgroundColor: '#BEC0D6',
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 160,
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
    fontSize: 30,
    margin: 10,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ModalAll;
