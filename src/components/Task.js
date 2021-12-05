import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';

const Task = ({ item, deleteTask, toggleTask }) => {
    return (
        <View style={taskStyle.container}>
            <IconButton type={images.unselected} />
            <IconButton type={item.completed ? images.completed : images.uncompleted}
            id = {item.id} onPressOut = {toggleTask} completed={item.completed} />
            <Text style = {[taskStyle.contents,
                {color: (item.completed ? theme.done : theme.text)},
                {textDecorationLine: (item.completed ? 'line-through' : 'none')}]}>
                {item.text}</Text>
            <IconButton type={images.update} />
            {/* <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} completed={item.completed} /> */}
        </View>
    )
}

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
