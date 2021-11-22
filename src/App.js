import React, {useState} from 'react';
import {StatusBar, SafeAreaView, Text, Dimensions, View} from 'react-native';
import {viewStyles, textStyles, barStyles} from './styles';
import Input from './components/Input';
import { images } from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';
import Rate from './components/Rate';
import Topicon from './components/TopIcon';
import Date from './components/ShowDate';
import Category from './components/Category';

export default function App() {

    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState('');

    const _addTask = () => {
        alert(`Add: ${newTask}`);
        setNewTask('');
    }

    const _handleTextChange = text => {
        setNewTask(text);
    };

    return (
        <SafeAreaView style={viewStyles.container}>
            <StatusBar barStyle="light-content" style={barStyles.statusbar}/>
            <Text style={textStyles.title}>TODO List</Text>
            {/* <Input value={newTask} onChangeText={_handleTextChange}
            onSubmitEditing={_addTask}/> */}
                <View width = {width-20}>
                    <Date text = "    2021 / 11 / 22" />
                    <Rate text = "Work: 70%                                     Life: 30%" />
                    <Topicon />
                    <Task text = "Todo item #1" />
                    <Task text = "Todo item #2" />
                    <Category text = "WORK      LIFE"/>
                </View>
        </SafeAreaView>
    );
};
