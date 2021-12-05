import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';

const Category = ({ text }) => {
    return (
        <View style={cateStyle.container}>
            <Text style={cateStyle.contents}>{text}</Text>
        </View>
    )

}

const cateStyle = StyleSheet.create({
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


Category.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Category;