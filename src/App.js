import React, {useState} from 'react';
import {StatusBar, SafeAreaView, Text, Dimensions, View} from 'react-native';
import {viewStyles, textStyles, barStyles} from './styles';
import Input from './components/Input';
import { images } from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';

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
            <Input value={newTask} onChangeText={_handleTextChange}
            onSubmitEditing={_addTask}/>
                <View width = {width-20}>
                    <Task text = "Todo item #1" />
                    <Task text = "Todo item #2" />
                </View>
        </SafeAreaView>
    );
};
