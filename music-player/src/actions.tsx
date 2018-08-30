export const PLAY_NEXT_SONG_ACTION_TYPE = 'PLAY_NEXT_SONG';
export const PLAY_PREV_SONG_ACTION_TYPE = 'PLAY_PREV_SONG';
export const CHANGE_PLAYLIST_ACTION_TYPE = 'CHANGE_PLAYLIST';
export const ADD_PLAYLIST_ACTION_TYPE = 'ADD_PLAYLIST_SAVE';
export const ADD_SONG_TO_PLAYLIST_ACTION_TYPE = 'ADD_SONG_TO_PLAYLIST';
export const REMOVE_SONG_FROM_PLAYLIST_ACTION_TYPE = 'REMOVE_SONG_FROM_PLAYLIST_OK';

export const playPrevSongAction = { type: PLAY_PREV_SONG_ACTION_TYPE };
export const playNextSongAction = { type: PLAY_NEXT_SONG_ACTION_TYPE };
export const createChangePlaylistActionObject = (newPlaylist: string) => ({
  type: CHANGE_PLAYLIST_ACTION_TYPE,
  newPlaylist,
});
export const createAddPlaylistSaveActionObject = (newPlaylist: string) => ({
  type: ADD_PLAYLIST_ACTION_TYPE,
  newPlaylist,
});
export const createAddSongToPlaylistActionObject = (playlist: string, songIndex: number) => ({
  type: ADD_SONG_TO_PLAYLIST_ACTION_TYPE,
  playlist,
  songIndex,
});
export const createRemoveSongFromPlaylistActionObject = (songIndex: number) => ({
  type: REMOVE_SONG_FROM_PLAYLIST_ACTION_TYPE,
  songIndex,
});
