import SQLite from 'react-native-sqlite-storage-api30';
import Toast from 'react-native-simple-toast';

const db = SQLite.openDatabase(
  {name: 'NewsData.db', location: 'default'},
  () => {},
  error => {
    console.log(error);
  },
);

export const initDatabase = async () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS NewsData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        publishedAt TEXT,
        urlToImage TEXT,
        title TEXT,
        name TEXT,
        isFavorite INTEGER DEFAULT 0,
        favoriteTimestamp TEXT DEFAULT NULL
      );`,
    );
  });
};

export const storeData = newsDataArray => {
  // alert(newsDataArray.length)
  db.transaction(tx => {
    newsDataArray.forEach(newsData => {
      tx.executeSql(
        `INSERT INTO NewsData (publishedAt, urlToImage, title, name, isFavorite, favoriteTimestamp)
           VALUES (?, ?, ?, ?, ?, ?);`,
        [
          newsData.publishedAt,
          newsData.urlToImage,
          newsData.title,
          newsData.source.name,
          0,
          '',
        ],
        (_, {insertId}) => {
          // console.log(`Data inserted with ID: ${insertId}`);
        },
        (_, error) => {
          console.log('Error inserting data:', error);
        },
      );
    });
  });
};

export const getUniqueNewsData = (
  Limit,
  ArrData,
  previousRecordIds,
  setpreviousRecordIds,
) => {
  var previousRecordIdsX = previousRecordIds;
  // alert(Limit)
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM NewsData
       WHERE id NOT IN (${previousRecordIdsX.join(',')})
       AND isFavorite = 0
       ORDER BY RANDOM()
       LIMIT ${Limit};`,
      [],
      (_, result) => {
        const rows = result.rows;
        const data = [];

        for (let i = 0; i < rows.length; i++) {
          const item = rows.item(i);
          data.push(item);
          previousRecordIdsX.push(item.id);
        }
        ArrData(data);
        setpreviousRecordIds(previousRecordIdsX);
      },
      (_, error) => {
        console.log('Error retrieving data:', error);
      },
    );
  });
};

export const getFavorite = (
  ArrData,
  previousRecordIds,
  setpreviousRecordIds,
) => {
  var previousRecordIdsX = previousRecordIds;
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM NewsData

       WHERE isFavorite = 1`,
      [],
      (_, result) => {
        const rows = result.rows;
        const data = [];

        for (let i = 0; i < rows.length; i++) {
          const item = rows.item(i);
          data.push(item);
          previousRecordIdsX.push(item.id);
        }
        ArrData(data);
        setpreviousRecordIds(previousRecordIdsX);
      },
      (_, error) => {
        console.log('Error retrieving data:', error);
      },
    );
  });
};

export const dropTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS NewsData;',
      [],
      () => {
        console.log('Table dropped successfully');
      },
      (_, error) => {
        console.log('Error dropping table:', error);
      },
    );
  });
};

export const checkDataExists = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT COUNT(*) AS count FROM NewsData;',
      [],
      (_, result) => {
        const count = result.rows.item(0).count;
        console.log('count', count);
        if (count > 0) {
          callback(true); // Data exists in the table
        } else {
          callback(false); // Data does not exist in the table
        }
      },
      (_, error) => {
        console.log('Error checking data existence:', error);
      },
    );
  });
};

export const deleteAllDataFromTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM NewsData WHERE isFavorite = 0`,
      [],
      (_, result) => {
        console.log('Data deleted successfully');
      },
      (_, error) => {
        console.log('Error deleting data:', error);
      },
    );
  });
};

export const markAsFavorite = itemId => {
  const currentTimestamp = new Date().toISOString();

  db.transaction(tx => {
    tx.executeSql(
      'UPDATE NewsData SET isFavorite = 1, favoriteTimestamp = ? WHERE id = ?;',
      [currentTimestamp, itemId],
      (_, result) => {
        Toast.show('Added to Favorite.');
        console.log('Object marked as favorite');
        // fetchFavoriteObjects();
      },
      (_, error) => {
        console.log('Error marking object as favorite:', error);
      },
    );
  });
};

export const removeFavorite = itemId => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE NewsData SET isFavorite = 0, favoriteTimestamp = NULL WHERE id = ?;',
      [itemId],
      (_, result) => {
        Toast.show('Removed from Favorite.');
        console.log('Item removed from favorites');
      },
      (_, error) => {
        console.log('Failed to remove item from favorites:', error);
      },
    );
  });
};

export const getAllDataFromTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Execute the SELECT query
      tx.executeSql(
        'SELECT * FROM NewsData',
        [],
        (txObj, resultSet) => {
          // Convert the result set to an array of objects
          const data = [];
          const rows = resultSet.rows;
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          // Resolve the promise with the retrieved data
          resolve(data);
        },
        (txObj, error) => {
          // Reject the promise with the error message
          reject(error.message);
        },
      );
    });
  });
};

export default db;
