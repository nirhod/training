import {playNextSongActionName, playPrevSongActionName, changePlaylistActioName} from './actions';
import {songsNamesList} from './data';
import {State, Action} from './types';


const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case playNextSongActionName:
            return {
                ...state,
                currentSongIndex: (state.currentSongIndex + 1) % songsNamesList.length
            };
        case playPrevSongActionName:
            return {
                ...state,
                currentSongIndex: state.currentSongIndex !== 0 ?
                    (state.currentSongIndex - 1) : songsNamesList.length - 1
            };
        case  changePlaylistActioName:
            return {
                ...state,
                currentPlaylist: action.newPlaylist
            };
        default:
            return state;
    }
};

export default reducer;