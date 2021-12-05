import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Task from './components/Task';

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});


function Work(props) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView style={styles.scrollView}>
          {Object.values(props.workTasks)
          .reverse()
          .map((item) => (
            <Task item={item} key={item.key}>{item.text}</Task>
          ))}
      </ScrollView>
    </View>
  );
}


export default Work;