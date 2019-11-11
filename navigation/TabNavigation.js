import React from "react";
import { View } from "react-native";
import { Platform } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from '../components/MessagesLink';
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";

const stackFactory = (initalRoute, customConfig) => 
    createStackNavigator({
        InitalRoute: {
            screen: initalRoute,
            navigationOptions: { 
                ...customConfig,
                headerStyle: { ...stackStyles }
            },
        }
    },{
        headerLayoutPreset: "center"
    });

export default createBottomTabNavigator({
    Home: {
        screen: stackFactory(Home, {
            title: "Home",
            headerRight: <MessagesLink />,
            headerTitle: <NavIcon name="logo-instagram" size={36} />
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={Platform.OS === "ios" ? "ios-home" : "md-home"}
                />
            )
        }
    },
    Search: {
        screen: stackFactory(Search, {
            title: "Search",
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                />
            )
        }
    },
    Add: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({ navigation }) =>
                navigation.navigate("PhotoNavigation"),
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={
                        Platform.OS === "ios" 
                        ? "ios-add-circle-outline" 
                        : "md-add-circle-outline"
                    }
                />
            )
        },
    },
    Notifications: {
        screen: stackFactory(Notifications, {
            title: "Notifications",
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={
                        Platform.OS === "ios"
                        ? focused
                            ? "ios-heart"
                            : "ios-heart-empty"
                        : focused
                        ? "md-heart"
                        : "md-heart-empty"
                    }
                />
            )
        }
    },
    Profile: {
        screen: stackFactory(Profile, {
            title: "Profile",
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={Platform.OS === "ios" ? "ios-person" : "md-person"}
                />
            )
        }
    }
}, 
{
    tabBarOptions: {
        showLabel: false,
        style: {
            backgroundColor: "#FAFAFA"
        }   
    }
});

