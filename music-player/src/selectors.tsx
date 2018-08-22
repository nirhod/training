import {State} from './types'

export const getCurrentSongIndex = (state: State) => state.songsListState.currentSongIndex;
export const getCurrentPlaylistName = (state: State) => state.songsListState.currentPlaylistName;
export const getPlaylists = (state: State) => state.songsListState.playlists;
