import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from './config';
import styles from "../styles";

const PhotoTabs = createMaterialTopTabNavigator({
    Take: {
        screen: TakePhoto,
        navigationOptions: {
            tabBarLabel: "Take"
        }
    },
    Select: {
        screen: SelectPhoto,
        navigationOptions: {
            tabBarLabel: "Select"
        }
    }
}, {
    tabBarPosition: "bottom",
    tabBarOptions: {
        indicatorStyle: {
            backgroundColor: styles.blackColor,
        },
        labelStyle: {
            color: styles.blackColor,
            fontWeight: "600"
         },
        style: {
            ...stackStyles
        }
    }
});

export default createStackNavigator(
    {
        Tabs: {
            screen: PhotoTabs,
            navigationOptions: {
                title: "Choose Photo",
            }   
        },
        Upload: {
            screen: UploadPhoto,
            navigationOptions: {
                title: "Upload Photo",
            }   
        }
    },{
        defaultNavigationOptions: {
            headerStyle: {
                ...stackStyles
            },
            headerTintColor: styles.blackColor   
        },
        headerLayoutPreset: "center"
    }
);