export type State = { songsListState: SongsListState };
export type SongsListState = {
  currentSongIndex: number;
  currentPlaylistName: string;
  openAddPlaylistWindow: boolean;
  playlists: {};
};
export type Action = { type: string; newPlaylist: string };
