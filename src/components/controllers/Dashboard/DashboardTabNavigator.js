import React from "react";
import { StyleSheet, Image } from "react-native";

import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import MyList from "./List/MyList";
import Settings from "./Settings/Settings";
import MyProfile from "./Settings/MyProfile";
import ChangePassword from "./Settings/ChangePassword";
import ChangeEmail from "./Settings/ChangeEmail";
import NewTask from "./List/NewTask/NewTask";
import EditTask from "./List/EditTask/EditTask";
import MyCalendar from "./Calendar/MyCalendar";
import TaskDetails from "./List/TaskDetails/TaskDetails";

const ListStack = new createStackNavigator({
  List: {
    screen: MyList,
    navigationOptions: {
      title: "My list"
    }
  },
  NewTask: {
    screen: NewTask,
    navigationOptions: {
      title: "New task"
    }
  },
  EditTask: {
    screen: EditTask,
    navigationOptions: {
      title: "Edit task"
    }
  },
  TaskDetails: {
    screen: TaskDetails,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.task.title}`,
    })
  }
});

const CalendarStack = new createStackNavigator({
  MyCalendar: {
    screen: MyCalendar,
    navigationOptions: {
      title: "My calendar"
    }
  }
});

const SettingsStack = new createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: "Settings"
    }
  },
  MyProfile: {
    screen: MyProfile,
    navigationOptions: {
      title: "My profile"
    }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      title: "Change password"
    }
  },
  ChangeEmail: {
    screen: ChangeEmail,
    navigationOptions: {
      title: "Change email"
    }
  }
});

const DashboardTabNavigator = new createBottomTabNavigator({
  List: {
    screen: ListStack,
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: ({ focused }) => {
          const image = focused 
          ? require('../../../assets/selectedList.png') 
          : require('../../../assets/list.png')
          return (
              <Image 
                  source={image}
                  style={{ width: 24, height: 24 }}
              />
          )
      }
    }
  },
  Calendar: {
    screen: CalendarStack,
    navigationOptions: {
      tabBarLabel: 'Calendar',
      tabBarIcon: ({ focused }) => {
        const image = focused
        ? require('../../../assets/selectedCalendar.png') 
        : require('../../../assets/calendar.png')
        return (
            <Image 
                source={image}
                style={{ width: 24, height: 24 }}
            />
        )
      }
    }
  },
  Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ focused }) => {
            const image = focused 
            ? require('../../../assets/selectedSettings.png') 
            : require('../../../assets/settings.png')
            return (
                <Image 
                    source={image}
                    style={{ width: 24, height: 24 }}
                />
            )
        }
      }
  }
});

export default DashboardTabNavigator;


