import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';

const Task = (props) => {
  return (
    <View style={(props.item.WorkOrLife==='Work') ? taskStyle.workContainer : taskStyle.lifeContainer}>
      <IconButton 
        type={props.item.selected ? images.selected : images.unselected}
        id={props.item.id}
        onPressOut={props.selectTask}
        selected={props.item.selected}
      />
      <IconButton
        type={props.item.completed ? images.completed : images.uncompleted}
        id={props.item.id}
        onPressOut={props.toggleTask}
        completed={props.item.completed}
      />
      <Text
        style={[
          taskStyle.contents,
          { color: props.item.completed ? theme.done : theme.text },
          {
            textDecorationLine: props.item.completed ? 'line-through' : 'none',
          },
        ]}
      >
        {props.item.text}
      </Text>
      <Text>{props.item.dueDate}</Text>
      <IconButton
        type={images.update}
        id={props.item.id}
        onPressOut={() => props.modalPopup(props.item)}
      />
    </View>
  );
};

const taskStyle = StyleSheet.create({
  workContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.work,
    borderRadius: 10,
    padding: 5,
    marginTop: 3,
    marginLeft: 0,
  },
  lifeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.life,
    borderRadius: 10,
    padding: 5,
    marginTop: 3,
    marginLeft: 0,
  },
  contents: {
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
    color: theme.text,
  },
});

Task.propTypes = {
  item: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
};

export default Task;
