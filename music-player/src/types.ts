export type State = { currentSongIndex: number};
export type Song = { name: string; index: number };
export type MusicControllerState = {currentSongIndex: number; playPrevSong: () => void; playNextSong: () => void};