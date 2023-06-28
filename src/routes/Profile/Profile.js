import React from 'react';
import {Text, View} from 'react-native';
import AppHeader from '../../common/Headers/AppHeader';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';
import {windowWidth} from '../../common/commonFunctions/commonFunctions';
import AppFonts from '../../assets/fonts/AppFonts';

function Profile() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader title={'Profile'} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          source={{
            uri: 'https://media.licdn.com/dms/image/D4D03AQG-Kx9t321DzQ/profile-displayphoto-shrink_400_400/0/1685618263865?e=1693440000&v=beta&t=Ov3dYsCzPFDduaPj4cpNvGzj1gu_-JVi0oUz_yCZf_k',
          }}
          style={{height: 100, width: 100, borderRadius: 50, marginBottom: 5}}
        />
        <Text style={[style.nameFont, {marginVertical: 5}]}>
          Tanveer Bhiyani
        </Text>
        <Text style={style.nameFont}>Btanveerkhan@gmail.com</Text>
        <FastImage
          source={require('../../assets/images/qrcode.png')}
          style={{height: 200, width: 200, borderRadius: 5, marginVertical: 10}}
        />
        <Text style={style.nameFont}>Linkedin QR</Text>
      </View>
    </View>
  );
}
export default Profile;
const style = StyleSheet.create({
  nameFont: {
    fontFamily: AppFonts.PoppinsRegularFont,
    fontSize: windowWidth / 35,
    color: 'black',
  },
});
