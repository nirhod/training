export type State = { songsListState: SongsListState };
export type SongsListState = {
  currentSongIndex: number;
  currentPlaylistName: string;
  openAddPlaylistWindow: boolean;
  playlists: {};
  openAddSongToPlaylistWindow: boolean;
  openRemoveSongFromPlaylistWindow: boolean;
  songIndexToChangePlaylist: number;
};
export type Action = { type: string; newPlaylist: string; songIndexToChangePlaylist: number };
