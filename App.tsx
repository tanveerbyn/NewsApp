/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {initDatabase} from './src/common/DBStorage/database';
import {NetworkProvider} from './src/common/commonFunctions/NetworkContext';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/routes/SplashScreen/Splash';
import TabNavigation from './src/common/Components/MyTabBar';
const Stack = createStackNavigator();
function App() {
  useEffect(() => {
    // dropTable()
    initDatabase();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <NetworkProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BottomTabs"
              component={TabNavigation}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NetworkProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
