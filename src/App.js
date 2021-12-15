import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalAll from './components/ModalAll';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tabs from './Tabs';
import { images } from './images';
import IconButton from './components/IconButton';
import Rate from './components/Rate';
import {theme} from './theme';
import {viewStyles, textStyles, barStyles} from './styles';
import onShare from './components/Share';
import ShowDate from './components/ShowDate';
import SelectDropdown from 'react-native-select-dropdown'

export default function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({
    1: { id: '1', text: 'todo list 1', completed: true, WorkOrLife : 'Work' },
    2: { id: '5', text: 'todo list 2', completed: false, WorkOrLife : 'Life' },
  });  
  const [category, setCategory] = useState('Work');

  //work and life ratio
  const [workRatio, setWorkRatio] = useState(0); //시작은 0이니까
  const [lifeRatio, setLifeRatio] = useState(0);
  const calculateRatio = (tasks) => {
    var work = Object.values(tasks).filter(item => item.WorkOrLife=='Work');
    const ratio = ((Object.values(work).length/Object.values(tasks).length)*100).toFixed(0);
    setWorkRatio(ratio);
    setLifeRatio(100 - ratio);
  }
  useEffect(() =>{
    calculateRatio(tasks);
  }, [tasks]);
  
  //All Select Icon 변경
  const [allSelect, setAllSelect] = useState(false);
  const _allSelectBox = () => { // 클릭시 일어나는 변화
    console.log(workTasks); //디버깅용
    setAllSelect(!allSelect);
    //여기에 체크아이콘을 전부 바꿔주는 함수가
  };

  //filtering (드롭다운 메뉴에서 메뉴 선택. App.js에선 선택된 메뉴 인덱스를 보내주기만 하고 필터링은 Work & Life에서 진행한다))
  const [filterIndex, setFilterIndex] = useState(0); // 0. 1. 2

  const [modalVisible, setModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: "Life되냐", completed: false, WorkOrLife: 'Life' },
    };    
    setTasks({ ...tasks, ...newTaskObject });
    calculateRatio(tasks);
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

  const _submitCategory = (value) => {
    setCategory(value);
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  const _modalPopup = (id) => {
    setModalVisible(true);
    setIsNew(false);
    const currentTasks = Object.assign({}, tasks);
    setNewTask(currentTasks[id]['text']);
  };

  return (
    <SafeAreaView style={viewStyles.container}>
      <StatusBar barStyle='light-content' style={barStyles.statusbar} />
      <Text style={textStyles.title}>TODO List</Text>
      <ShowDate />
      <View style={styles.workAndLife}>
        <Rate text={`WORK : ${workRatio}%`} />
        <Rate text={`LIFE : ${lifeRatio}%`} />
      </View>

      {/**Top Icon */}
      <View style={topStyle.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            _allSelectBox();
          }}
        >
          <Image
            source={allSelect ? images.selected : images.unselected}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setNewTask('');
            setIsNew(true);
          }}
        >
          <MaterialCommunityIcons name='plus-circle' size={30} color='black' />
        </TouchableOpacity>

        <ModalAll
          isVisible={modalVisible}
          hide={() => setModalVisible(false)}
          isNew={isNew}
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={isNew ? _addTask : _updateTask}
          submitCategory={_submitCategory}
        />
        <IconButton type={images.delete} />
        <SelectDropdown
                  data={["전체", "미완료", "완료"]}
                  defaultValueByIndex={0}
                  buttonStyle={{width: '30%', height: '80%', marginRight: 5, marginLeft: 20}}
                  onSelect={(selectedItem, index) => {
                    setFilterIndex(index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                />
      </View>

      <View style={styles.scrollView}>
        <Tabs
          tasks={tasks}
          deleteTask={_deleteTask}
          toggleTask={_toggleTask}
          updateTask={_updateTask}
          modalPopup={_modalPopup}
          filterIndex={filterIndex}
        />
      </View>
      <Text style={styles.header} onPress={() => onShare(tasks)}>
        오늘 할 일 공유하기
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 20,
    margin: 5,
    padding: 10,
    backgroundColor: theme.itemBackground,
    width: '100%',
  },
  scrollView: {
    width: '100%',
    height: '65%',
    margin: 5,
    padding: 10,
  },
  workAndLife: {
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    marginLeft: 0,
  },
  icon: {
    tintColor: theme.text,
    width: 30,
    height: 30,
    margin: 10,
  },
  bar: {
    width: '60%',
    backgroundColor: theme.itemBackground,
  },
});

//Top Icon 일렬로
const topStyle = StyleSheet.create({
  container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
  },
  contents: {
    fontSize: 24,
    color: theme.text,
  },
});
