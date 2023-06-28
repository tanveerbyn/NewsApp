import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import AppHeader from '../../common/Headers/AppHeader';
import axios from 'axios';
import ListHeader from '../../common/Headers/ListHeader';
import {NewsObj} from '../../common/MainListItem/ListItemInterface';
import {
  checkDataExists,
  deleteAllDataFromTable,
  getAllDataFromTable,
  getFavorite,
  getUniqueNewsData,
  storeData,
} from '../../common/DBStorage/database';
import NetworkContext from '../../common/commonFunctions/NetworkContext';
import MainListComponent from '../../common/Components/MainListComponent';
import NewsSlider from '../../common/NewsSlider';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
function Home({route}) {
  const isConnected = useContext(NetworkContext);
  const [NewsList, setNewsList] = useState<Array<NewsObj>>([]);
  const [favoriteList, setfavoriteList] = useState<Array<NewsObj>>([]);
  const [previousRecordIds, setpreviousRecordIds] = useState<Array<number>>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWaiting, setisWaiting] = useState(true);
  const [isStarted, setisStarted] = useState(false);
  const [isInitial, setisInitial] = useState(true);
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

  function DataCheck() {
    checkDataExists((dataExists: boolean) => {
      if (dataExists) {
        getFavoriteList();
        if (isConnected) {
          callApi();
        } else {
          setisStarted(true);
        }
      } else {
        console.log('Data does not exist in the table');
        callApi();
      }
    });
  }

  useEffect(() => {
    DataCheck();
  }, [isConnected]);

  useEffect(() => {
    // exit early when we reach 0
    if (!isStarted) {
      return;
    }
    if (!timeLeft) {
      getUniqueNewsData(
        isInitial ? 10 : 5,
        (data: Array<NewsObj>) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          if (data.length === 0 && isConnected) {
            setisStarted(false);
            setTimeLeft(0);
            callApi();
            setisInitial(true);
            return;
          }
          setNewsList([
            ...favoriteList,
            ...data,
            ...NewsList.slice(favoriteList.length),
          ]);
          setTimeLeft(10);
          setisInitial(false);
        },
        previousRecordIds,
        setpreviousRecordIds,
      );

      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, isStarted, favoriteList, isConnected]);

  function filterIds() {
    // setNewsList([...favoriteList]);
    var ids = [];
    for (let index = 0; index < favoriteList.length; index++) {
      const element = favoriteList[index];
      ids.push(element.id);
    }
    setpreviousRecordIds(ids);
  }
  function callApi() {
    if (isConnected) {
      filterIds();
      setisWaiting(true);
      axios
        .get(
          'https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=c62e462725cb462c876fadd82adb455f',
        )
        .then(response => {
          if (response?.status === 200) {
            // setNewsList(response?.data?.articles);
            deleteAllDataFromTable();
            storeData(response?.data?.articles.splice(0, 100));
            setisStarted(true);
            console.log(
              'response?.data?.articles',
              response?.data?.articles.length,
            );
          } else {
            Toast.show(response?.statusText);
          }
          setTimeout(() => {
            setisWaiting(false);
          }, 200);
          console.log('response', response);
        })
        .catch(error => {
          setisWaiting(false);
          Toast.show('Something went wrong');
          console.log('error', error);
        });
    } else {
      Toast.show('No Internet connection');
      setisWaiting(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader title={route.name === 'Discover' ? 'Discover' : 'News App'} />
      {route.name === 'Discover' ? <NewsSlider /> : null}
      {NewsList.length > 0 ? (
        <ListHeader
          Label={'Recommended For You'}
          isRefresh
          refreshFX={() => {
            if (isConnected) {
              if (NewsList.length > 0) {
                setTimeLeft(0);
              } else {
                callApi();
              }
            } else {
              setTimeLeft(0);
            }
          }}
        />
      ) : null}
      {/* {!isWaiting ? (
        <ActivityIndicator color={'black'} style={{flex: 1 ,position:'absolute',alignSelf: 'center',alignContent: 'center'}} />
      ) : null} */}
      <MainListComponent
        NewsList={NewsList}
        setNewsList={setNewsList}
        previousRecordIds={previousRecordIds}
        setpreviousRecordIds={setpreviousRecordIds}
        setfavoriteList={setfavoriteList}
        favoriteList={favoriteList}
        isWaiting={isWaiting}
        callApi={callApi}
      />
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
