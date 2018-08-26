export const playNextSongActionName = 'PLAY_NEXT_SONG';
export const playPrevSongActionName = 'PLAY_PREV_SONG';
export const changePlaylistActioName = 'CHANGE_PLAYLIST';
export const addPlaylistOpenWindowActionName = 'ADD_PLAYLIST_OPEN_WINDOW';
export const addPlaylistSaveActionName = 'ADD_PLAYLIST_SAVE';
export const addPlaylistCancelActionName = 'ADD_PLAYLIST_CANCEL';
export const addSongToPlaylistOpenWindowActionName = 'ADD_SONG_TO_PLAYLIST_OPEN_WINDOW';
export const addSongToPlaylistCloseWindowActionName = 'CLOSE_ADD_SONG_TO_PLAYLIST_OPEN_WINDOW';


export const playPrevSongAction = { type: playPrevSongActionName };
export const playNextSongAction = { type: playNextSongActionName };
export const getChangePlaylistAction = (newPlaylist: string) => ({ type: changePlaylistActioName, newPlaylist });
export const addPlaylistOpenWindowAction = { type: addPlaylistOpenWindowActionName };
export const addPlaylistSaveAction = (newPlaylist: string) => ({ type: addPlaylistSaveActionName, newPlaylist });
export const addPlaylistCancelAction = { type: addPlaylistCancelActionName };
export const addSongToPlaylistOpenWindowAction = (songIndexToChangePlaylist: number) =>
  ({ type: addSongToPlaylistOpenWindowActionName, songIndexToChangePlaylist });
export const addSongToPlaylistCloseWindowAction = {type: addSongToPlaylistCloseWindowActionName};
