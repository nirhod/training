import {playNextSongActionName, playPrevSongActionName, changePlaylistActioName} from './actions';
import {songsNamesList} from './data';
import {SongsListState, Action} from './types';
import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';

const initialSongsListState: SongsListState = {
    currentSongIndex: 0,
    currentPlaylist: 'All',
    playlists: {
        All: songsNamesList.map((name, index) => index),
        'First Songs': [0, 1]
    }
};

const reducer = (songsListState: SongsListState = initialSongsListState, action: Action) => {
    switch (action.type) {
        case playNextSongActionName:
            return {
                ...songsListState,
                currentSongIndex: (songsListState.currentSongIndex + 1) % songsNamesList.length
            };
        case playPrevSongActionName:
            return {
                ...songsListState,
                currentSongIndex: songsListState.currentSongIndex !== 0 ?
                    (songsListState.currentSongIndex - 1) : songsNamesList.length - 1
            };
        case  changePlaylistActioName:
            return {
                ...songsListState,
                currentPlaylist: action.newPlaylist
            };
        default:
            return songsListState;
    }
};

export const combinedReducers = combineReducers({songsListState: reducer, router: routerReducer});
