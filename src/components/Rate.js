import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';

const Rate = ({ text }) => {
    return (
        <Text style={rateStyle.contents}>{text}</Text>
    )
}

const rateStyle = StyleSheet.create({
    contents: {
        fontSize: 20,
        color: theme.text,
    },
});

Rate.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Rate;