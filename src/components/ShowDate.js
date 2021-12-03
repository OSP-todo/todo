import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';


const Date = ({ text }) => {
    return (
        <View style={dateStyle.container}>
            <IconButton type={images.calendar} />
            <IconButton type={images.arrowleft} />
            <Text style={dateStyle.contents}>{text}</Text>
            <IconButton type={images.arrowright} />
        </View>
    )

}

const dateStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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


Date.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Date;