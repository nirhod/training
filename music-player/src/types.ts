export type State = { songsListState:  SongsListState};
export type SongsListState = {currentSongIndex: number; currentPlaylistName: string; playlists: {}};
export type Action = { type: string; newPlaylist: string }
