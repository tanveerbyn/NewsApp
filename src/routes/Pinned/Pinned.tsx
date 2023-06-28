import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ListHeader from '../../common/Headers/ListHeader';
import AppHeader from '../../common/Headers/AppHeader';
import MainListComponent from '../../common/Components/MainListComponent';
import {NewsObj} from '../../common/MainListItem/ListItemInterface';
import {checkDataExists, getFavorite} from '../../common/DBStorage/database';
import {useIsFocused} from '@react-navigation/native';

function Pinned() {
  const [NewsList, setNewsList] = useState<Array<NewsObj>>([]);
  const [favoriteList, setfavoriteList] = useState<Array<NewsObj>>([]);
  const [previousRecordIds, setpreviousRecordIds] = useState<Array<number>>([]);
  const IsFocused = useIsFocused();
  useEffect(() => {
    if (IsFocused) {
      checkDataExists((dataExists: boolean) => {
        if (dataExists) {
          getFavoriteList();
        } else {
        }
      });
    }
  }, [IsFocused]);

  function getFavoriteList() {
    getFavorite(
      (data: Array<NewsObj>) => {
        setfavoriteList(data);
        setNewsList(data);
      },
      previousRecordIds,
      setpreviousRecordIds,
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader title="Pinned" />
      <ListHeader
        Label={'Pinned News'}
        isRefresh
        refreshFX={() => {
          getFavoriteList();
          //   setTimeLeft(0);
        }}
      />
      <MainListComponent
        fromPinned={true}
        NewsList={NewsList}
        setNewsList={setNewsList}
        previousRecordIds={previousRecordIds}
        setpreviousRecordIds={setpreviousRecordIds}
        setfavoriteList={setfavoriteList}
        favoriteList={favoriteList}
      />
    </View>
  );
}
export default Pinned;
