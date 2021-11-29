import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import Work from "./src/Work";
import Life from "./src/Life";

const Tabs = createBottomTabNavigator();

export default () => {
  return (
      <NavigationContainer>
          <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === "Work") {
                        iconName = "work";
                    } else if (route.name === "Life") {
                        iconName = "nightlife";
                    }
                    return (
                        <MaterialIcons
                            name={iconName}
                            color={focused ? "tomato" : "lightgrey"}
                        size={26}
                        />
                    );
                    }
                })}
                tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: 'gray'}}
                >
              <Tabs.Screen  options={{ headerShown: false }} name="Work" component={Work} />
              <Tabs.Screen  options={{ headerShown: false }} name="Life" component={Life} />
          </Tabs.Navigator>
      </NavigationContainer>
  );
};
