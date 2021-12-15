import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Work from './Work';
import Life from './Life';
import AllTasks from './AllTasks';
import { theme } from './theme';

const Tabs = createBottomTabNavigator();

export default (props) => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarInactiveBackgroundColor: 'rgba(1,1,1,0.02)',
          tabBarIconStyle: {
            marginTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            marginBottom: 5,
          },
          tabBarActiveTintColor: theme.itemBackground,
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'AllTasks') {
              iconName = 'format-list-numbered';
            } else if (route.name === 'WORK') {
              iconName = 'work';
            } else if (route.name === 'LIFE') {
              iconName = 'nightlife';
            } 
            return (
              <MaterialIcons
                name={iconName}
                color={focused ? theme.itemBackground : 'lightgrey'}
                size={24}
              />
            );
          },
        })}
      >
        <Tabs.Screen
          options={{ headerShown: false }}
          name='AllTasks'
          children={() => (
            <AllTasks
              tasks={props.tasks}
              toggleTask={props.toggleTask}
              modalPopup={props.modalPopup}
              filterIndex={props.filterIndex}
              selectTask={props.selectTask}
            />
          )}
        />
        <Tabs.Screen
          options={{ headerShown: false }}
          name='WORK'
          children={() => (
            <Work
              tasks={props.tasks}
              toggleTask={props.toggleTask}
              modalPopup={props.modalPopup}
              filterIndex={props.filterIndex}
              selectTask={props.selectTask}
            />
          )}
        />
        <Tabs.Screen
          options={{ headerShown: false }}
          name='LIFE'
          children={() => (
            <Life
              tasks={props.tasks}
              toggleTask={props.toggleTask}
              modalPopup={props.modalPopup}
              filterIndex={props.filterIndex}
              selectTask={props.selectTask}
            />
          )}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
