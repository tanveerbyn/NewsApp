import React, {useCallback, useEffect, useRef, useState} from 'react';
import {LayoutAnimation, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {useSharedValue} from 'react-native-reanimated';
import AppFonts from '../assets/fonts/AppFonts';
import LinearGradient from 'react-native-linear-gradient';
import ListHeader from './Headers/ListHeader';
import {NewsListItemObj, NewsObj} from './MainListItem/ListItemInterface';
import {windowHeight, windowWidth} from './commonFunctions/commonFunctions';
import {StyleSheet} from 'react-native';
import {getUniqueNewsData} from './DBStorage/database';
const baseOptions = {
  vertical: false,
  width: windowWidth * 0.85,
  height: windowWidth / 2.1,
};
function NewsSlider() {
  const progressValue = useSharedValue<number>(0);
  const [NewsList, setNewsList] = useState<Array<NewsObj>>([]);
  const [previousRecordIds, setpreviousRecordIds] = useState<Array<number>>([]);

  const timer = useRef<any>(null);
  const getBannerNewsData = () => {
    getUniqueNewsData(
      5,
      (data: Array<NewsObj>) => {
        setNewsList([...data]);
        //   setTimeLeft(10);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        timer.current = setTimeout(() => {
          getBannerNewsData();
        }, 10000);
      },
      previousRecordIds,
      setpreviousRecordIds,
    );
  };
  useEffect(() => {
    getBannerNewsData();
    () => {
      clearInterval(timer.current);
    };
  }, []);

  const renderItem = useCallback(
    (rowData: NewsListItemObj) => (
      <View key={rowData.index} style={styles.listContainer}>
        <View style={styles.listContainer2}>
          <FastImage
            source={{uri: rowData.item.urlToImage}}
            style={styles.Bannerimg}
            resizeMode="cover"
          />

          <View style={styles.bannerTextView}>
            <LinearGradient
              colors={['transparent', 'black', 'black']}
              style={styles.gradientStyle}
            />
            <Text style={styles.nameStyle}>{rowData.item.name}</Text>
            <Text style={styles.titleStyle} numberOfLines={2}>
              {rowData.item.title}
            </Text>
          </View>
        </View>
      </View>
    ),
    [NewsList],
  );

  return (
    <View>
      <ListHeader
        Label={'Breaking News'}
        isRefresh={false}
        refreshFX={() => {}}
      />
      <Carousel
        loop
        {...baseOptions}
        style={{
          width: windowWidth,
        }}
        autoPlay={true}
        data={NewsList}
        scrollAnimationDuration={1800}
        onSnapToItem={index => console.log('current index:', index)}
        pagingEnabled={true}
        snapEnabled={true}
        autoPlayInterval={2000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={renderItem}
      />
    </View>
  );
}
export default NewsSlider;
const styles = StyleSheet.create({
  listContainer: {
    justifyContent: 'center',
    elevation: 5,
    marginLeft: 10,
  },
  listContainer2: {
    backgroundColor: 'white',
    margin: 5,
    overflow: 'hidden',
    elevation: 10,
    borderRadius: 10,
  },
  Bannerimg: {height: windowHeight / 4.6, width: '100%'},
  bannerTextView: {position: 'absolute', bottom: 10},
  gradientStyle: {
    width: windowWidth,
    height: 100,
    position: 'absolute',
  },
  nameStyle: {
    fontFamily: AppFonts.PoppinsSemiBoldFont,
    marginStart: 15,
    color: 'white',
  },
  titleStyle: {
    fontFamily: AppFonts.PoppinsLightFont,
    marginStart: 15,
    color: 'white',
  },
});
