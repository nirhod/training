export const playNextSongActionName = 'PLAY_NEXT_SONG';
export const playPrevSongActionName = 'PLAY_PREV_SONG';
export const changePlaylistActioName = 'CHANGE_PLAYLIST';

export const playPrevSongAction = {type: playPrevSongActionName};
export const playNextSongAction = {type: playNextSongActionName};
export const getChangePlaylistAction = (newPlaylist: string) => ({type: changePlaylistActioName, newPlaylist});