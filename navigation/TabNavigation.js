import { View } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";

export default createBottomTabNavigator({
    Home,
    Search,
    Add: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation")
        }
    },
    Notifications,
    Profile
});
