import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalAll from './components/ModalAll';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tabs from "./Tabs";

export default function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({
    1: { id: '1', text: 'todo list 1', completed: false, WorkOrLife : 'Work' },
    2: { id: '2', text: 'todo list 2', completed: false, WorkOrLife : 'Work' },
    3: { id: '3', text: 'todo list 3', completed: false, WorkOrLife : 'Work' },
    4: { id: '4', text: 'todo list 4', completed: false, WorkOrLife : 'Life' },
    5: { id: '5', text: 'todo list 5', completed: false, WorkOrLife : 'Life' },
  });

  {/** Task 배열에서 work랑 life를 분류해줌. add랑 delete할 때마다 얘도 상태 바꿔줘야할듯...? */}
  const [workTasks, setWorkTasks] = useState(Object.values(tasks).reverse().filter(item => item.WorkOrLife=='Work'));
  const [lifeTasks, setLifeTasks] = useState(Object.values(tasks).reverse().filter(item => item.WorkOrLife=='Life'));
  const [ratio, setRatio] = useState((Object.values(workTasks).length/Object.values(tasks).length)*100);


  const [modalVisible, setModalVisible] = useState(false);

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
  };

  const _deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  };

  const _updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    setTasks(currentTasks);
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.header}>TO-Do List</Text>
      <Text style={styles.header}>2021/11/22</Text>
      <Text style={styles.header}>work : {ratio}% Life : {100-ratio}%</Text>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <MaterialCommunityIcons name='plus-circle' size={30} color='black' />
      </TouchableOpacity>
      <ModalAll
        isVisible={modalVisible}
        hide={() => setModalVisible(false)}
        value={newTask}
        onChangeText={_handleTextChange}
        onSubmitEditing={_addTask}
      />

      <View style={styles.scrollView}>
       {/** {Object.values(tasks)
          .reverse()
          .map((item) => (
            <Text key={item.key}>{item.text}</Text>
          ))} */}
        <Tabs workTasks = {workTasks} lifeTasks = {lifeTasks}/>
      </View>
      <Text style={styles.header}>Share 하기</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  header: {
    fontSize: 20,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    width: '100%',
  },
  scrollView: {
    width: '100%',
    height: '63%',
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
});
