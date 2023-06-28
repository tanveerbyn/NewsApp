/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from 'react-native';
import {NewsListItemObj, NewsObj} from '../MainListItem/ListItemInterface';
import NewsListItem from '../MainListItem/NewsListItem';
import {
  getFavorite,
  markAsFavorite,
  removeFavorite,
} from '../DBStorage/database';
import {
  removeFromArray,
  removeFromArrayUnique,
} from '../commonFunctions/commonFunctions';
import Toast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
function MainListComponent({
  NewsList,
  setNewsList,
  previousRecordIds,
  setpreviousRecordIds,
  setfavoriteList,
  favoriteList,
  isWaiting,
}: any) {
  const PinPost = (rowData: NewsListItemObj) => {
    // alert(1);
    if (favoriteList.length > 3) {
      Toast.show('Max Limit Reached');
      return;
    }
    markAsFavorite(rowData.item.id);
    const List = removeFromArray(NewsList, rowData.item.id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    getFavorite(
      (data: Array<NewsObj>) => {
        setfavoriteList(data);
        setNewsList([...data, ...List.slice(data.length - 1)]);
      },
      previousRecordIds,
      setpreviousRecordIds,
    );
  };
  const DeletePinPost = (rowData: NewsListItemObj) => {
    removeFavorite(rowData.item.id);
    const List = removeFromArray(NewsList, rowData.item.id);
    const ListUnique = removeFromArrayUnique(
      previousRecordIds,
      rowData.item.id,
    );
    // setNewsList(List);
    setpreviousRecordIds(ListUnique);
    console.log('ListX', List);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    getFavorite(
      (data: Array<NewsObj>) => {
        setfavoriteList(data);
        setNewsList([...data, ...List.slice(data.length + 1)]);
      },
      previousRecordIds,
      setpreviousRecordIds,
    );
  };

  const renderItem = useCallback(
    (rowData: NewsListItemObj) => (
      <NewsListItem
        {...rowData}
        PinPost={() => PinPost(rowData)}
        DeletePinPost={() => DeletePinPost(rowData)}
      />
    ),
    [NewsList, favoriteList],
  );
  const keyExtractor = useCallback((item: NewsObj) => item.id + '_', []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={NewsList}
        renderItem={renderItem}
        windowSize={8}
        // decelerationRate={'fast'}
        disableVirtualization={false}
        keyExtractor={keyExtractor}
        ListFooterComponent={() =>
          isWaiting ? (
            <ActivityIndicator color={'black'} style={{margin: 10}} />
          ) : null
        }
      />
    </View>
  );
}
export default MainListComponent;
