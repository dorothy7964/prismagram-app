import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";

const stackFactory = (initalRoute, customConfig) => 
    createStackNavigator({
        InitalRoute: {
            screen: initalRoute,
            navigationOptions: { ...customConfig },
        }
    },{
        headerLayoutPreset: "center"
    });

export default createBottomTabNavigator({
    Home: {
        screen: stackFactory(Home, {
            title: "Home",
            headerRight: (
                <TouchableOpacity>
                    <Text>headerRight</Text>
                </TouchableOpacity>
            )
        })
    },
    Search: {
        screen: stackFactory(Search, {
            title: "Search",
        })
    },
    Add: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation")
        }
    },
    Notifications: {
        screen: stackFactory(Notifications, {
            title: "Notifications",
        })
    },
    Profile: {
        screen: stackFactory(Profile, {
            title: "Profile",
        })
    },
});
