import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppFonts from '../../assets/fonts/AppFonts';
import {windowWidth} from '../commonFunctions/commonFunctions';

export default function NodataFoundComponent({retry}) {
  return (
    <View style={styles.waitIndicator}>
      <Text style={styles.NodataFound}>No Data Found</Text>
      <TouchableOpacity onPress={retry}>
        <Text style={[styles.NodataFound, {textDecorationLine: 'underline'}]}>
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  waitIndicator: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NodataFound: {
    fontFamily: AppFonts.PoppinsRegularFont,
    fontSize: windowWidth / 25,
    color: 'black',
  },
});
