export type State = { songsListState:  SongsListState};
export type SongsListState = {currentSongIndex: number; currentPlaylist: string; playlists: {}};
export type Action = { type: string; newPlaylist?: string }
