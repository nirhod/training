export type State = { songsListState: SongsListState };
export type SongsListState = {
  currentSongIndex: number;
  currentPlaylistName: string;
  playlists: {};
  isValidURL: boolean;
};
export type Action = { type: string; newPlaylist: string; songIndex: number; playlist: string };
