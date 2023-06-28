/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppFonts from '../../assets/fonts/AppFonts';
import {
  FormatDateToLocale,
  windowWidth,
} from '../commonFunctions/commonFunctions';
import FastImage from 'react-native-fast-image';
import {NewsListItemObj} from './ListItemInterface';
import {Swipeable} from 'react-native-gesture-handler';

function NewsListItem({
  item,
  PinPost,
  DeletePinPost,
  RemovePost,
}: NewsListItemObj) {
  const swipeableRef = useRef(null);

  const handleCloseSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const [loading, setLoading] = useState(false);
  const imageUrl = item?.urlToImage;

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
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
                source={require('../../assets/images/unpin.png')}
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
          <TouchableOpacity
            onPress={() => {
              RemovePost();
              handleCloseSwipeable();
            }}>
            <FastImage
              source={require('../../assets/images/delete.png')}
              style={styles.swipeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}>
      <View
        style={[
          styles.Container,
          {
            padding: item.isFavorite ? 5 : 0,
            elevation: item.isFavorite ? 5 : 0,
          },
        ]}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <FastImage
            // source={{uri: item?.urlToImage, priority: FastImage.priority.high}}
            style={styles.newsImg}
            resizeMode="cover"
            source={{
              uri: imageUrl,
              priority: FastImage.priority.normal,
            }}
            // style={{width: 200, height: 200}}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
          />
          {loading && (
            <ActivityIndicator
              style={{position: 'absolute'}}
              color={'black'}
              size='small'
            />
          )}
        </View>

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
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
