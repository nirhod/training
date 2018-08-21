export type State = { currentSongIndex: number};
export type Song = { name: string, index: number };
export type MusicControllerState = {currentSongIndex: number, prevSong: () => void, nextSong: () => void};