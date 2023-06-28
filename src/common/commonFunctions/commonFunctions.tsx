import {Dimensions} from 'react-native';
import {NewsObj} from '../MainListItem/ListItemInterface';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export function FormatDateToLocale(DateString: string) {
  var dateObj = new Date(DateString);
  /* Convert Date Format to Ex: June 25 2023 */
  var dateToLocale = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return dateToLocale;
}

export function removeFromArray(array: Array<NewsObj>, SelectedID: number) {
  // alert(SelectedID)
  const updatedArray = array.filter((item: NewsObj) => item.id !== SelectedID);
  return updatedArray;
}
export function removeFromArrayUnique(
  array: Array<number>,
  SelectedID: number,
) {
  // alert(SelectedID)
  const updatedArray = array.filter((item: NewsObj) => item !== SelectedID);
  return updatedArray;
}
