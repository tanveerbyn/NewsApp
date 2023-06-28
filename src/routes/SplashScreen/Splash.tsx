import React from 'react';
import {Text, View, StatusBar, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppFonts from '../../assets/fonts/AppFonts';
import {windowWidth} from '../../common/commonFunctions/commonFunctions';
import {useLayoutEffect} from 'react';

function Splash({navigation}: any) {
  useLayoutEffect(() => {
    setTimeout(() => {
      navigation.replace('BottomTabs');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <FastImage
        source={require('../../assets/images/appicon.png')}
        style={styles.splashImg}
      />
      <Text style={styles.splashText}>News App</Text>
    </View>
  );
}
export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImg: {height: 100, width: 100, borderRadius: 5, alignSelf: 'center'},
  splashText: {
    marginVertical: 10,
    fontFamily: AppFonts.PoppinsMediumFont,
    fontSize: windowWidth / 23,
  },
});
