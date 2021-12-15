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


function Life (props) {
  var lifeTasks = Object.values(props.tasks).filter(item => item.WorkOrLife=='Life');
  const [filteredTasks, setFilteredTasks] = useState(lifeTasks);
  
  useEffect(() => {
    lifeTasks = Object.values(props.tasks).filter(item => item.WorkOrLife=='Life');

    //메뉴 설정된 상태에서 추가해도 자연스럽게
    setFilteredTasks(lifeTasks);
    if(props.filterIndex==1){ //미완료
      setFilteredTasks(Object.values(filteredTasks).filter(item => item.completed==false));
    }else if(props.filterIndex==2){ //완료
      setFilteredTasks(Object.values(filteredTasks).filter(item => item.completed==true));
    } 
  }, [props.tasks]);

  useEffect(() => {
    if(props.filterIndex==0){ //전체
      setFilteredTasks(lifeTasks);
    }else if(props.filterIndex==1){ //미완료
      setFilteredTasks(Object.values(lifeTasks).filter(item => item.completed==false));
    }else{ //완료
      setFilteredTasks(Object.values(lifeTasks).filter(item => item.completed==true));
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
        {Object.values(filteredTasks)
          .reverse()
          .map((item) => (
            <Task
              item={item}
              key={item.id}
              toggleTask={props.toggleTask}
              modalPopup={props.modalPopup}
              deleteTask={props.deleteTask}

            >
              {item.text}
            </Task>
          ))}
      </ScrollView>
    </View>
  );
}

export default Life;
