import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';

const Task = ({ text }) => {
    return (
        <View style={taskStyle.container}>
            <IconButton type={images.unselected} />
            <IconButton type={images.uncompleted} />
            <Text style={taskStyle.contents}>{text}</Text>
            <IconButton type={images.update} />
            {/* <IconButton type={images.delete} /> */}
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
    text: PropTypes.string.isRequired,
};

export default Task;