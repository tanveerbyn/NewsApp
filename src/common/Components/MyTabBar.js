import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../routes/Homescreen/Home';
import Profile from '../../routes/Profile/Profile';
import Pinned from '../../routes/Pinned/Pinned';
import {windowHeight} from '../commonFunctions/commonFunctions';
import AppFonts from '../../assets/fonts/AppFonts';

const Tab = createBottomTabNavigator();
function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          console.log('route.name', route.name);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        var icon = '';
        switch (route.name) {
          case 'Home':
            icon = require('../../assets/images/home.png');
            break;
          case 'Discover':
            icon = require('../../assets/images/Discover.png');
            break;
          case 'Pinned':
            icon = require('../../assets/images/Pinned.png');
            break;
          case 'Profile':
            icon = require('../../assets/images/Profile.png');
            break;
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            style={styles.touchContainer}>
            <FastImage
              source={icon}
              style={styles.img}
              resizeMode="contain"
              tintColor={isFocused ? 'black' : 'gray'}
            />
            <Text
              style={{
                color: isFocused ? 'black' : 'gray',
                fontFamily: AppFonts.PoppinsRegularFont,
                fontSize: 12,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        unmountOnBlur: true,
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}
      // shifting={true}
      labeled={true}
      sceneAnimationEnabled={true}
      activeColor="black"
      inactiveColor="#BBBCBC">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Home} />
      <Tab.Screen name="Pinned" component={Pinned} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  touchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  img: {height: 18, width: 18, margin: 5},
});
export default TabNavigation;
