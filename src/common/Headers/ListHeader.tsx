import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppFonts from '../../assets/fonts/AppFonts';
interface ListHeader {
  Label: string;
  isRefresh: boolean;
  refreshFX: any;
}
function ListHeader({Label, isRefresh, refreshFX}: ListHeader) {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{Label}</Text>
      <TouchableOpacity onPress={refreshFX}>
        <Text style={styles.labelText}>{isRefresh ? 'Refresh' : ''}</Text>
      </TouchableOpacity>
    </View>
  );
}
export default ListHeader;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  labelText: {
    fontFamily: AppFonts.PoppinsSemiBoldFont,
    color: 'black',
  },
});
