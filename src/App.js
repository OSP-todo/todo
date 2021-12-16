import React, { useEffect, useState } from 'react';
import {
  StatusBar,
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
import ProgressBar from 'react-native-progress/Bar';

export default function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({
    1: { id: '1', text: 'todo list 1', selected: false, completed: true, WorkOrLife : 'Work', dueDate: '2021/12/16' },
    2: { id: '2', text: 'todo list 2', selected: false, completed: false, WorkOrLife : 'Life', dueDate: '2021/12/16' },
  });  
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('2021/12/21');
  const [topDate, setTopDate] = useState('2021/12/21');

  //topDate를 task에 보내줘야해서 (dueDate지난 task는 안보이도록 하는 기능 구현용.)
  const _submitTopDate = (value) => { //
    setTopDate(value);
  };

  //work and life ratio
  const [workRatio, setWorkRatio] = useState(0); //시작은 0
  const [lifeRatio, setLifeRatio] = useState(0);
  const calculateRatio = (tasks) => {
    var work = Object.values(tasks).filter(item => item.WorkOrLife=='Work');
    var currentWork= Object.values(work).filter((item) => item.dueDate.replace('/','').replace('/','') >= topDate.replace('/','').replace('/',''));
    var currentTask= Object.values(tasks).filter((item) => item.dueDate.replace('/','').replace('/','') >= topDate.replace('/','').replace('/',''));
    if(Object.values(currentTask).length != 0){
      const ratio = ((Object.values(currentWork).length / Object.values(currentTask).length)*100).toFixed(0);
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
  }, [topDate]);
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
      [ID]: { id: ID, text: newTask, selected: false, completed: false, WorkOrLife: category, dueDate: dueDate },
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
    setAllSelect(false);
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
    const currentTasks = Object.assign({}, tasks);
    Object.values(currentTasks).map((element) => {
      if(element.id == id){
        currentTasks[id]['text'] = newTask;
        currentTasks[id]['WorkOrLife'] = category;
        currentTasks[id]['dueDate'] = dueDate;
      }
    });
    setTasks(currentTasks);
  };

  //work or life modal
  const _submitCategory = (value) => { //카테고리 설정
    setCategory(value);
  };

  //due date modal
  const _submitDueDate = (value) => { //카테고리 설정
    setDueDate(value);
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  return (
    <SafeAreaView style={viewStyles.container}>
      <StatusBar barStyle='light-content' style={barStyles.statusbar} />
      <Text style={textStyles.title}>TODO LIST</Text>
      <ShowDate submitTopDate={_submitTopDate}/>
      <View style={styles.workAndLife}>
        <Text style={{fontSize: 20, fontWeight:'800', color: theme.work}}>WORK</Text><Text style={{fontSize: 15, color:'rgba(1,1,1,0.8)'}}>{workRatio}%</Text>
        {/*<Rate text={`WORK ${workRatio}%`} />*/}
        <ProgressBar borderColor={'rgba(0,0,0,0)'} progress={workRatio/100} height={13} width={200} color={theme.work} unfilledColor={theme.life}/>
        <Text style={{fontSize: 15, color:'rgba(1,1,1,0.8)'}}>{lifeRatio}%</Text><Text style={{fontSize: 20, fontWeight: '800', color: theme.life}}>LIFE</Text>
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
          submitDueDate={_submitDueDate}
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
          topDate={topDate}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    marginBottom: 5
  },
  icon: {
    tintColor: theme.text,
    width: 30,
    height: 30,
    margin: 10,
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
