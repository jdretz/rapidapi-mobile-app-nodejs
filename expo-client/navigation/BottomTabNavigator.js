import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Notes';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Notes"
        component={HomeScreen}
        options={{
          title: 'View Notes',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list" />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={LinksScreen}
        options={{
          title: 'Add Note',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Notes':
      return 'View Notes';
    case 'Add':
      return 'Add a note';
  }
}
