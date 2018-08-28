export const playNextSongActionName = 'PLAY_NEXT_SONG';
export const playPrevSongActionName = 'PLAY_PREV_SONG';
export const changePlaylistActioName = 'CHANGE_PLAYLIST';
export const addPlaylistActionName = 'ADD_PLAYLIST_SAVE';
export const addSongToPlaylistActionName = 'ADD_SONG_TO_PLAYLIST';
export const removeSongFromPlaylistActionName = 'REMOVE_SONG_FROM_PLAYLIST_OK';

export const playPrevSongAction = { type: playPrevSongActionName };
export const playNextSongAction = { type: playNextSongActionName };
export const getChangePlaylistAction = (newPlaylist: string) => ({ type: changePlaylistActioName, newPlaylist });
export const getAddPlaylistSaveAction = (newPlaylist: string) => ({ type: addPlaylistActionName, newPlaylist });
export const getAddSongToPlaylistAction = (playlist: string, songIndex: number) => ({
  type: addSongToPlaylistActionName,
  playlist,
  songIndex,
});
export const getRemoveSongFromPlaylistAction = (songIndex: number) => ({
  type: removeSongFromPlaylistActionName,
  songIndex,
});
