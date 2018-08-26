import {
  changePlaylistActioName,
  playNextSongActionName,
  playPrevSongActionName,
  addPlaylistCancelActionName,
  addPlaylistSaveActionName,
  addPlaylistOpenWindowActionName,
  addSongToPlaylistOpenWindowActionName,
  // addSongToPlaylistCloseWindowActionName,
} from './actions';
import { songsNamesList } from './data';
import { Action, SongsListState, State } from './types';
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
  openAddPlaylistWindow: false,
  openAddSongToPlaylistWindow: false,
  openRemoveSongFromPlaylistWindow: false,
  songIndexToChangePlaylist: -1
};

const songsListStateReducer = (songsListState: SongsListState = initialSongsListState, action: Action) => {
  const { currentSongIndex, playlists, currentPlaylistName } = songsListState;
  switch (action.type) {
    case playNextSongActionName:
    case playPrevSongActionName:
      const currentPlaylistArray = playlists[currentPlaylistName];
      const songIndexInPlaylist = currentPlaylistArray.indexOf(currentSongIndex);
      if (action.type === playNextSongActionName) {
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
    case changePlaylistActioName:
      if (!(action.newPlaylist in playlists)) {
        return {
          ...songsListState,
          currentSongIndex: -1,
        };
      }
      return {
        ...songsListState,
        currentPlaylistName: action.newPlaylist,
        currentSongIndex: playlists[action.newPlaylist][0],
      };
    case addPlaylistOpenWindowActionName:
      return {
        ...songsListState,
        openAddPlaylistWindow: true,
      };
    case addPlaylistCancelActionName:
      return {
        ...songsListState,
        openAddPlaylistWindow: false,
      };
    case addPlaylistSaveActionName:
      return {
        ...songsListState,
        openAddPlaylistWindow: false,
        playlists: { ...songsListState.playlists, [action.newPlaylist]: [] },
      };
    case addSongToPlaylistOpenWindowActionName:
      return {
        ...songsListState,
        openAddSongToPlaylistWindow: true,
        songIndexToChangePlaylist: action.songIndexToChangePlaylist
      };
    // case addSongToPlaylistCloseWindowActionName:
    //   return {
    //     // TODO Add support for adding new song
    //     ...songsListState,
    //     openAddSongToPlaylistWindow: false,
    //     openRemoveSongFromPlaylistWindow: false
    //   };

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
export const getOpenAddPlaylistWindow = (state: State) => state.songsListState.openAddPlaylistWindow;
export const getOpenAddSongToPlaylistWindow = (state: State) => state.songsListState.openAddSongToPlaylistWindow;
export const getSongIndexToChangePlaylist = (state: State) => state.songsListState.songIndexToChangePlaylist;
