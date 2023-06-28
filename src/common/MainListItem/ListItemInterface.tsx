export type NewsListItemObj = {
  item: NewsObj;
  index: number;
  PinPost: any;
  DeletePinPost: any;
};
export type NewsObj = {
  id: number;
  publishedAt: string;
  urlToImage: string;
  title: string;
  name: string;
  isFavorite: number;
  favoriteTimestamp: string;
};
