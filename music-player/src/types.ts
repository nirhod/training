import {Dispatch} from 'redux';

export type State = { currentSongIndex: number };
export type Song = { name: string; index: number };
export type MusicControllerProps = { currentSongIndex: number; dispatch: Dispatch};
export type Action = { type: string }