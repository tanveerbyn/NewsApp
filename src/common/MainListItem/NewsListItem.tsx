/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppFonts from '../../assets/fonts/AppFonts';
import {
  FormatDateToLocale,
  windowWidth,
} from '../commonFunctions/commonFunctions';
import FastImage from 'react-native-fast-image';
import {NewsListItemObj} from './ListItemInterface';
import {Swipeable} from 'react-native-gesture-handler';

function NewsListItem({item, PinPost, DeletePinPost}: NewsListItemObj) {
  const swipeableRef = useRef(null);

  const handleCloseSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };
  return (
    <Swipeable
      key={item.id}
      ref={swipeableRef}
      renderRightActions={() => (
        <View style={styles.swipeContainer}>
          {item.isFavorite ? (
            <TouchableOpacity
              onPress={() => {
                DeletePinPost();
                handleCloseSwipeable();
              }}>
              <FastImage
                source={require('../../assets/images/delete.png')}
                style={styles.swipeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                PinPost();
                handleCloseSwipeable();
              }}>
              <FastImage
                source={require('../../assets/images/pin.png')}
                style={styles.swipeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      )}>
      <View
        style={[
          styles.Container,
          {
            padding: item.isFavorite ? 5 : 0,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: item.isFavorite ? 5 : 0,
            backgroundColor: 'white',
          },
        ]}>
        <FastImage
          source={{uri: item?.urlToImage,priority: FastImage.priority.high,}}
          
          style={styles.newsImg}
          resizeMode="cover"
        />
        <View style={styles.Container2}>
          <View style={{flex: 1}}>
            <Text style={styles.nameStyle}>• {item?.name}</Text>
            <Text style={styles.title} numberOfLines={2}>
              {item?.title}
            </Text>
          </View>
          <Text style={styles.nameStyle}>
            {FormatDateToLocale(item?.publishedAt)}
          </Text>
        </View>
        {item.isFavorite ? (
          <FastImage
            source={require('../../assets/images/pin.png')}
            style={styles.pinImg}
            resizeMode="contain"
          />
        ) : null}
      </View>
    </Swipeable>
  );
}
export default NewsListItem;
const styles = StyleSheet.create({
  Container: {
    borderRadius: 10,
    flex: 1,
    // backgroundColor: item.isFavorite ? 'green' : 'white',
    marginVertical: 8,
    marginHorizontal: 15,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  swipeImage: {height: 22, width: 22, marginHorizontal: 20},
  newsImg: {
    height: 70,
    width: 80,
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: 'gray',
  },
  Container2: {
    flexDirection: 'column',
    marginStart: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  nameStyle: {
    fontFamily: AppFonts.PoppinsRegularFont,
    fontSize: windowWidth / 35,
    color: 'gray',
  },
  title: {
    fontFamily: AppFonts.PoppinsSemiBoldFont,
    fontSize: windowWidth / 30,
    color: 'black',
  },
  pinImg: {
    height: 15,
    width: 15,
    marginHorizontal: 0,
    transform: [{rotate: '90deg'}],
  },
});
