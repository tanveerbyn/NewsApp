import {Text, View, StatusBar} from 'react-native';
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <FastImage
        source={require('../../assets/images/appicon.png')}
        style={{height: 100, width: 100, borderRadius: 5, alignSelf: 'center'}}
      />
      <Text
        style={{
          marginVertical: 10,
          fontFamily: AppFonts.PoppinsMediumFont,
          fontSize: windowWidth / 23,
        }}>
        News App
      </Text>
    </View>
  );
}
export default Splash;
