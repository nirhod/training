import {playNextSongActionName, playPrevSongActionName} from './actions';
import {songsList} from './data';
import {State, Action} from './types';


const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case playNextSongActionName:
            return {
                ...state,
                currentSongIndex: (state.currentSongIndex + 1) % songsList.length
            };
        case playPrevSongActionName:
            return {
                ...state,
                currentSongIndex: state.currentSongIndex !== 0 ? (state.currentSongIndex - 1) : songsList.length - 1
            };
        default:
            return state;
    }
};

export default reducer;