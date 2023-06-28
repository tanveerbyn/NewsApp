import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FastImage from 'react-native-fast-image';
import AppFonts from '../../assets/fonts/AppFonts';
interface HeaderProp {
  title: string;
}
const HamBurgerImage = require('../../assets/images/appicon.png');
const NotificationImage = require('../../assets/images/notification.png');
function AppHeader({title}: HeaderProp) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={styles.headerView}>
        <FastImage source={HamBurgerImage} style={styles.imageStyle} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <FastImage source={NotificationImage} style={styles.imageStyle} />
    </View>
  );
}
export default AppHeader;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontFamily: AppFonts.PoppinsRegularFont,
    margin: 10,
    color: Colors.black,
  },
  headerView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  imageStyle: {height: 25, width: 25},
});
