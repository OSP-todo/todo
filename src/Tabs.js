import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import Work from "./Work";
import Life from "./Life";

const Tabs = createBottomTabNavigator();

export default (props) => {
    return (
        <NavigationContainer>
            <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === "WORK") {
                        iconName = "work";
                    } else if (route.name === "LIFE") {
                        iconName = "nightlife";
                    }
                    return (
                            <MaterialIcons
                                name={iconName}
                                color={focused ? "tomato" : "lightgrey"}
                                size={24}
                            />
                        );}
                    })}
                    tabBarOptions={{
                        inactiveBackgroundColor:'rgba(1,1,1,0.02)',
                        iconStyle: {
                            marginTop:5
                        },
                        labelStyle: {
                            fontSize: 10,
                            marginBottom: 5
                        },
                        activeTintColor: 'tomato', inactiveTintColor: 'gray',
                    }}
                >
                <Tabs.Screen options={{ headerShown: false }} name="WORK" children={()=><Work workTasks={props.workTasks}/>} />
                <Tabs.Screen options={{ headerShown: false }} name="LIFE" children={()=><Life lifeTasks={props.lifeTasks}/>} />
            </Tabs.Navigator>
        </NavigationContainer>
    );
};
