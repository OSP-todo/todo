import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

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
          <Text>{Object.values(props.workTasks)
          .reverse()
          .map((item) => (
            <Text key={item.key}>{item.text}</Text>
          ))}</Text>
      </ScrollView>
    </View>
  );
}


export default Work;