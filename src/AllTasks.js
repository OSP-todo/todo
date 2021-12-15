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

function AllTasks(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const incompletedTasks = Object.values(props.tasks).filter(item => item.completed==false);
  const completedTasks = Object.values(props.tasks).filter(item => item.completed==true);

  useEffect(() => {
    if(props.filterIndex==0){ //전체
      setTasks(props.tasks);
    }else if(props.filterIndex==1){ //미완료
      setTasks(incompletedTasks);
    }else{ //완료
      setTasks(completedTasks);
    }  
  }, [props.filterIndex]);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);
  
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
              deleteTask={props.deleteTask}
              selectTask={props.selectTask}
            >
              {item.text}
            </Task>
          ))}
      </ScrollView>
    </View>
  );
}

export default AllTasks;
