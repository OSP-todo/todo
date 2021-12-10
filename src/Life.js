import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Task from './components/Task';

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: 'rgba(1,1,1,0.05)',
    marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
});


function life(props) {
  const [tasks, setTasks] = useState(props.lifeTasks);
  const incompletedTasks = Object.values(props.lifeTasks).filter(item => item.completed==false);
  const completedTasks = Object.values(props.lifeTasks).filter(item => item.completed==true);

  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id-1]['completed'] = !currentTasks[id-1]['completed'];
    //id-1(key)로 하면 life부터 key가 바뀌기 때문에 id로 받아오는 걸로 수정해야함
    setTasks(currentTasks);
  };

  useEffect(() => {
    if(props.filterIndex==0){ //전체
      setTasks(props.lifeTasks);
    }else if(props.filterIndex==1){ //미완료
      setTasks(incompletedTasks);
    }else{ //완료
      setTasks(completedTasks);
    }  
  }, [props.filterIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView style={styles.scrollView}>
          {Object.values(tasks)
          .map((item) => (
            <Task item={item} key={item.key} toggleTask={_toggleTask}>{item.text}</Task>
          ))}
      </ScrollView>
    </View>
  );
}


export default life;