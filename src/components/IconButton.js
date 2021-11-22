import React from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import { images } from '../images';

const IconButton = ({type, onPressOut}) => {
    return (
        <Pressable onPressOut={onPressOut}>
            <Image source={type} style={iconStyle.icon}/>
        </Pressable>
    );
};

const iconStyle = StyleSheet.create({
    icon: {
        tintColor: theme.text,
        width: 30,
        height: 30,
        margin: 10,
    },
});

IconButton.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired,
    onPressOut: PropTypes.func,
};

export default IconButton;