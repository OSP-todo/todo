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
  
  //dueDate 지난건 안보여줌
  useEffect(()=>{
    var dueDateTasks = Object.values(lifeTasks).filter((item) =>
      item.dueDate.replace('/','').replace('/','') >= props.topDate.replace('/','').replace('/','')
    );
    if(props.filterIndex==0){ //전체
      setFilteredTasks(dueDateTasks);
    }else if(props.filterIndex==1){ //미완료
      setFilteredTasks(Object.values(dueDateTasks).filter(item => item.completed==false));
    }else if(props.filterIndex==2){ //완료
      setFilteredTasks(Object.values(dueDateTasks).filter(item => item.completed==true));
    }
  },[props.topDate]);

  //life
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
    var dueDateTasks = Object.values(lifeTasks).filter((item) =>
      item.dueDate.replace('/','').replace('/','') >= props.topDate.replace('/','').replace('/','')
    );
    
    if(props.filterIndex==0){ //전체
      setFilteredTasks(dueDateTasks);
    }else if(props.filterIndex==1){ //미완료
      setFilteredTasks(Object.values(dueDateTasks).filter(item => item.completed==false));
    }else{ //완료
      setFilteredTasks(Object.values(dueDateTasks).filter(item => item.completed==true));
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
              deleteTask={props.deleteTask}
              selectTask={props.selectTask}
              updateTask={props.updateTask}
              modalPopup={props.modalPopup}
            >
              {item.text}
            </Task>
          ))}
      </ScrollView>
    </View>
  );
}

export default Life;
