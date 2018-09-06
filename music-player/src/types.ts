import { ActionsTypes } from './actions';

export type State = { songsListState: SongsListState };
export type SongsListState = {
  currentSongIndex: number;
  currentPlaylistName: string;
  playlists: {};
  isValidURL: boolean;
};
export type IndexPlaylistAction = {
  type: ActionsTypes.ADD_SONG_TO_PLAYLIST_ACTION_TYPE;
  payload: {
    playlist: string;
    songIndex: number;
  };
};
export type PlaylistAction = {
  type: ActionsTypes.CHANGE_PLAYLIST_ACTION_TYPE | ActionsTypes.ADD_PLAYLIST_ACTION_TYPE;
  payload: {
    playlist: string;
  };
};
export type IndexAction = {
  type: ActionsTypes.REMOVE_SONG_FROM_PLAYLIST_ACTION_TYPE;
  payload: {
    songIndex: number;
  };
};
export type BasicAction = { type: ActionsTypes.PLAY_NEXT_SONG_ACTION_TYPE | ActionsTypes.PLAY_PREV_SONG_ACTION_TYPE };
export type RootAction = IndexPlaylistAction | PlaylistAction | IndexAction | BasicAction;
