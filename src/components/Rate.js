import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import { images } from '../images';

const Rate = ({ text }) => {
    return (
        <View style ={rateStyle.container}>
            <Text style={rateStyle.contents}>{text}</Text>
        </View>
    )
}

const rateStyle = StyleSheet.create({
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
        fontSize: 20,
        color: theme.text,
    },
});

Rate.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Rate;