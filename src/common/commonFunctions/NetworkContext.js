import React, {createContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaView} from 'react-native';

// Create the Network Context
const NetworkContext = createContext();
const backgroundStyle = {
  backgroundColor: 'white',
  flex: 1,
};
// Create a Network Provider component
export const NetworkProvider = ({children}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={isConnected}>
      <SafeAreaView style={backgroundStyle}>{children}</SafeAreaView>
    </NetworkContext.Provider>
  );
};

// Export the Network Context and Consumer
export const NetworkConsumer = NetworkContext.Consumer;
export default NetworkContext;
