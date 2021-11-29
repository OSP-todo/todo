import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Work from "./src/Work";
import Life from "./src/Life";

const Tabs = createBottomTabNavigator();

export default () => {
  return (
      <NavigationContainer>
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'lightgray',
                iconStyle: {
                marginTop:5
                },
                labelStyle: {
                marginBottom:10
                },
                style: {
                height:65,
                backgroundColor: "rgba(12, 144, 125, 1)",
                borderTopColor: "rgba(12, 144, 125, 1)"
                }
            }}
            >
            <Tabs.Screen name="WORK" component={Work} />
            <Tabs.Screen name="LIFE" component={Life} />
        </Tabs.Navigator>
    </NavigationContainer>
  );
};