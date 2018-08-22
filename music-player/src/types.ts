import {Dispatch} from 'redux';

export type State = { currentSongIndex: number; currentPlaylist: string; playlists: {} };
export type MusicControllerProps = { currentSongIndex: number; dispatch: Dispatch};
export type Action = { type: string }