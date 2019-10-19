import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";

const TabNavigation = createBottomTabNavigator({
    Home,
    Search,
    Add: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: () => {
                console.log("Add");
            }
        }
    },
    Notifications,
    Profile
});

export default createAppContainer(TabNavigation);