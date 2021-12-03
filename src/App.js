import React, { useState } from 'react';
import {
  StatusBar,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalAll from './components/ModalAll';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tabs from "./Tabs";
import Date from './components/ShowDate';
import { images } from './images';
import IconButton from './components/IconButton';
import Rate from './components/Rate';
import {theme} from './theme';
import {viewStyles, textStyles, barStyles} from './styles';
import onShare from '../Share';

export default function App() {
  const width = Dimensions.get('window').width;

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({
    1: { id: '1', text: 'todo list 1', completed: true, WorkOrLife : 'Work' },
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
    <SafeAreaView style={viewStyles.container}>
      <StatusBar barStyle="light-content" style={barStyles.statusbar}/>
      <Text style={textStyles.title}>TODO List</Text>
          <Date text = "    2021 / 11 / 22    " />
          <View style={styles.workAndLife}>
            <Rate text = {`WORK : ${ratio}%`} />
            <Rate text = {`LIFE : ${100-ratio}%`} />
          </View>
          
          {/**Top Icon */}
          <View style={topStyle.container}>
            <IconButton type={images.unselected}/>
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
            <IconButton type={images.delete}/>
          </View>

          <View style={styles.scrollView}>
          {/**task 배열을 map해야할 자리 */}
          <Tabs workTasks = {workTasks} lifeTasks = {lifeTasks}/>
      </View>
      <Text style={styles.header} onPress={()=> onShare(tasks)}>오늘 할 일 공유하기</Text>
      </SafeAreaView>
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
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    width: '100%',
  },
  scrollView: {
    width: '100%',
    height: '65%',
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  workAndLife: {
    width:'100%',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    marginLeft: 0
  }
});

//Top Icon 일렬로
const topStyle = StyleSheet.create({
  container: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  contents: {
      fontSize: 24,
      color: theme.text,
  },
});

