import React, {useState} from 'react';
import {StatusBar, SafeAreaView, Text, Dimensions, View, ScrollView} from 'react-native';
import {viewStyles, textStyles, barStyles} from './styles';
import Input from './components/Input';
import { images } from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';
import Rate from './components/Rate';
import Topicon from './components/TopIcon';
import Date from './components/ShowDate';
import Category from './components/Category';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export default function App() {

    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState('');

    const [tasks, setTasks] = useState({
        '1': {id: '1', text: "Todo item #1", completed: false},
        '2': {id: '2', text: "Todo item #2", completed: true},
    });

    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        setTasks({...tasks, ...newTaskObject });
    }

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    };

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
                    <Rate text = "_______________________________________"/>
                    <Topicon />
                    <ScrollView>
                        {Object.values(tasks).reverse().map(item => (
                        <Task key={item.id} item={item} deleteTask={_deleteTask}
                        toggleTask={_toggleTask} />
                    ))}
                    </ScrollView>
                    <Category text = "WORK      LIFE"/>
                </View>
        </SafeAreaView>
    );
};
