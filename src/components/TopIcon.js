import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {theme} from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';

const Topicon = ({}) => {
    return (
        <View style={topStyle.container}>
            <IconButton type={images.unselected}/>
            <IconButton type={images.add}/>
            <IconButton type={images.delete}/>
        </View>
    )

}

const topStyle = StyleSheet.create({
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


// Topicon.propTypes = {
    
// };

export default Topicon;