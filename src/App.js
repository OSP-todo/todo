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
    1: { id: '1', text: 'todo list 1', selected: false, completed: true, WorkOrLife : 'Work' },
    2: { id: '2', text: 'todo list 2', selected: false, completed: false, WorkOrLife : 'Life' },
  });  
  const [category, setCategory] = useState('Work');

  //work and life ratio
  const [workRatio, setWorkRatio] = useState(0); //시작은 0이니까
  const [lifeRatio, setLifeRatio] = useState(0);
  const calculateRatio = (tasks) => {
    var work = Object.values(tasks).filter(item => item.WorkOrLife=='Work');
    if(Object.values(tasks).length != 0){
      const ratio = ((Object.values(work).length/Object.values(tasks).length)*100).toFixed(0);
      setWorkRatio(ratio);
      setLifeRatio(100 - ratio);
    }
    else { //예외 처리
      setWorkRatio(0);
      setLifeRatio(0);
    }
  }
  useEffect(() =>{
    calculateRatio(tasks);
  }, [tasks]);
  
  //All Select
  const [allSelect, setAllSelect] = useState(false);
  const _allSelectBox = () => { // 클릭시 일어나는 변화
    setAllSelect(!allSelect);
    const currentTasks = Object.assign({}, tasks);
    if(allSelect===false) //useEffect없이 해서 false일때 true로 만들어야함
      Object.values(currentTasks).map((item) => item.selected = true);
    else
      Object.values(currentTasks).map((item) => item.selected = false);
    setTasks(currentTasks);
  };

  //filtering (드롭다운 메뉴에서 메뉴 선택)
  const [filterIndex, setFilterIndex] = useState(0); // 0. 1. 2

  const [modalVisible, setModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, selected: false, completed: false, WorkOrLife: category },
    };
    setTasks({ ...tasks, ...newTaskObject });
    calculateRatio(tasks); //비율 계산 
  };
  
  //삭제를 위한 셀렉트
  const _selectTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['selected'] = !currentTasks[id]['selected'];
    setTasks(currentTasks);
  };
  
  const _deleteTask = () => {
    const currentTasks = Object.assign({}, tasks);
    Object.values(currentTasks).map((item) => {
      if(item.selected == true)
        delete currentTasks[item.id];
    });
    setTasks(currentTasks);
  };

  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  };

  //update
  const [id, setId] = useState(0);

  //연필 모양 눌렀을 때
  const _modalPopup = (item) => {
    setModalVisible(true);
    setIsNew(false);
    const currentTasks = Object.assign({}, tasks);
    setNewTask(currentTasks[item.id]['text']);
    setId(item.id);
  };
  //모달에서 update버튼 눌렀을 때
  const _updateTask = () => {
    console.log(id);
    const currentTasks = Object.assign({}, tasks);
    Object.values(currentTasks).map((element) => {
      if(element.id == id){
        currentTasks[id]['text'] = newTask;
        currentTasks[id]['WorkOrLife'] = category;
      }
    });
    setTasks(currentTasks);
  };

  const _submitCategory = (value) => { //카테고리 설정
    setCategory(value);
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
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
        <IconButton onPressOut={_deleteTask} type={images.delete} />
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
          selectTask={_selectTask}
          toggleTask={_toggleTask}
          updateTask={_updateTask}
          filterIndex={filterIndex}
          modalPopup={_modalPopup}
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
