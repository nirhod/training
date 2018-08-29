export const PLAY_NEXT_SONG_ACTION_NAME = 'PLAY_NEXT_SONG';
export const PLAY_PREV_SONG_ACTION_NAME = 'PLAY_PREV_SONG';
export const CHANGE_PLAYLIST_ACTION_NAME = 'CHANGE_PLAYLIST';
export const ADD_PLAYLIST_ACTION_NAME = 'ADD_PLAYLIST_SAVE';
export const ADD_SONG_TO_PLAYLIST_ACTION_NAME = 'ADD_SONG_TO_PLAYLIST';
export const REMOVE_SONG_FROM_PLAYLIST_ACTION_NAME = 'REMOVE_SONG_FROM_PLAYLIST_OK';

export const playPrevSongAction = { type: PLAY_PREV_SONG_ACTION_NAME };
export const playNextSongAction = { type: PLAY_NEXT_SONG_ACTION_NAME };
export const changePlaylistAction = (newPlaylist: string) => ({ type: CHANGE_PLAYLIST_ACTION_NAME, newPlaylist });
export const addPlaylistSaveAction = (newPlaylist: string) => ({ type: ADD_PLAYLIST_ACTION_NAME, newPlaylist });
export const addSongToPlaylistAction = (playlist: string, songIndex: number) => ({
  type: ADD_SONG_TO_PLAYLIST_ACTION_NAME,
  playlist,
  songIndex,
});
export const removeSongFromPlaylistAction = (songIndex: number) => ({
  type: REMOVE_SONG_FROM_PLAYLIST_ACTION_NAME,
  songIndex,
});
