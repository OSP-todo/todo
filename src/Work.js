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

function Work(props) {
  const [tasks, setTasks] = useState(props.workTasks);
  const incompletedTasks = Object.values(props.workTasks).filter(item => item.completed==false);
  const completedTasks = Object.values(props.workTasks).filter(item => item.completed==true);

  const _toggleTask = (id) => {
    const currentTasks = tasks.map(item => {if(item.id==id) item.completed = !item.completed; return item;})
    setTasks(currentTasks);
  };

  useEffect(() => {
    if(props.filterIndex==0){ //전체
      setTasks(props.workTasks);
    }else if(props.filterIndex==1){ //미완료
      setTasks(incompletedTasks);
    }else{ //완료
      setTasks(completedTasks);
    }  
  }, [props.filterIndex]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ScrollView style={styles.scrollView}>
        {Object.values(tasks)
          .reverse()
          .map((item) => (
            <Task
              item={item}
              key={item.id}
              toggleTask={props.toggleTask}
              modalPopup={props.modalPopup}
            >
              {item.text}
            </Task>
          ))}
      </ScrollView>
    </View>
  );
}

export default Work;
