import { ActionsTypes } from './actions';
import { songsNamesList } from './data';
import { RootAction, SongsListState, State } from './types';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { viewport } from './forUrl/viewport';

const initialSongsListState: SongsListState = {
  currentSongIndex: 0,
  currentPlaylistName: 'All',
  playlists: {
    All: songsNamesList.map((name, index) => index),
    FirstSongs: [0, 1],
  },
  isValidURL: true,
};

const songsListStateReducer = (songsListState: SongsListState = initialSongsListState, action: RootAction) => {
  const { currentSongIndex, playlists, currentPlaylistName } = songsListState;
  switch (action.type) {
    case ActionsTypes.PLAY_NEXT_SONG_ACTION_TYPE:
    case ActionsTypes.PLAY_PREV_SONG_ACTION_TYPE:
      const currentPlaylistArray = playlists[currentPlaylistName];
      const songIndexInPlaylist = currentPlaylistArray.indexOf(currentSongIndex);
      if (action.type === ActionsTypes.PLAY_NEXT_SONG_ACTION_TYPE) {
        return {
          ...songsListState,
          currentSongIndex: currentPlaylistArray[(songIndexInPlaylist + 1) % currentPlaylistArray.length],
        };
      }
      return {
        ...songsListState,
        currentSongIndex:
          songIndexInPlaylist !== 0
            ? currentPlaylistArray[songIndexInPlaylist - 1]
            : currentPlaylistArray[currentPlaylistArray.length - 1],
      };
    case ActionsTypes.CHANGE_PLAYLIST_ACTION_TYPE:
      if (!(action.payload.playlist in playlists)) {
        return {
          ...songsListState,
          isValidURL: false,
        };
      }
      return {
        ...songsListState,
        currentPlaylistName: action.payload.playlist,
        currentSongIndex: playlists[action.payload.playlist][0],
      };
    case ActionsTypes.ADD_PLAYLIST_ACTION_TYPE:
      return {
        ...songsListState,
        playlists: { ...playlists, [action.payload.playlist]: [] },
      };
    case ActionsTypes.ADD_SONG_TO_PLAYLIST_ACTION_TYPE:
      return {
        ...songsListState,
        playlists: {
          ...playlists,
          [action.payload.playlist]: [...playlists[action.payload.playlist], action.payload.songIndex],
        },
      };
    case ActionsTypes.REMOVE_SONG_FROM_PLAYLIST_ACTION_TYPE:
      return {
        ...songsListState,
        playlists: {
          ...playlists,
          [currentPlaylistName]: playlists[currentPlaylistName].filter(
            (songIndex: number) => songIndex !== action.payload.songIndex,
          ),
        },
      };
    default:
      return songsListState;
  }
};

export const combinedReducers = combineReducers({
  songsListState: songsListStateReducer,
  router: routerReducer,
  viewport,
});

// Selectors:
export const getLocation = (state: any) => {
  return state.router.location;
};
export const getCurrentSongIndex = (state: State) => state.songsListState.currentSongIndex;
export const getCurrentPlaylistName = (state: State) => state.songsListState.currentPlaylistName;
export const getPlaylists = (state: State) => state.songsListState.playlists;
export const getIsValidURL = (state: State) => state.songsListState.isValidURL;
export const getPlaylistsNotIncludeSongIndex = (playlists: {}, songIndex: number): string[] =>
  Object.keys(playlists).filter(playlist => !playlists[playlist].includes(songIndex));
