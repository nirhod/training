import {State} from './types'

export const getCurrentSongIndex = (state: State) => state.songsListState.currentSongIndex;
export const getCurrentPlaylist = (state: State) => state.songsListState.currentPlaylist;
export const getPlaylists = (state: State) => state.songsListState.playlists;
