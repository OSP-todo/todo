import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';

const Task = (props) => {
  const [text, setText] = useState(props.item.text);
  const _onSubmitEditing = () => {
    const editedTask = Object.assign({}, item, { text });
    updateTask(editedTask);
  };

  return (
    <View style={taskStyle.container}>
      <IconButton type={images.unselected} />
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
      <IconButton
        type={images.update}
        id={props.item.id}
        onPressOut={props.modalPopup}
        onSubmitEditing={_onSubmitEditing}
      />
      {/* <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} completed={item.completed} /> */}
    </View>
  );
};

const taskStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.itemBackground,
    borderRadius: 10,
    padding: 5,
    marginTop: 3,
    marginLeft: 0,
  },

  contents: {
    flex: 1,
    fontSize: 24,
    color: theme.text,
  },
});

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default Task;
