import {IndexPlaylistAction, IndexAction, PlaylistAction, BasicAction} from './types'

export enum ActionsTypes {
  PLAY_NEXT_SONG_ACTION_TYPE = 'PLAY_NEXT_SONG',
  PLAY_PREV_SONG_ACTION_TYPE = 'PLAY_PREV_SONG',
  CHANGE_PLAYLIST_ACTION_TYPE = 'CHANGE_PLAYLIST',
  ADD_PLAYLIST_ACTION_TYPE = 'ADD_PLAYLIST_SAVE',
  ADD_SONG_TO_PLAYLIST_ACTION_TYPE = 'ADD_SONG_TO_PLAYLIST',
  REMOVE_SONG_FROM_PLAYLIST_ACTION_TYPE = 'REMOVE_SONG_FROM_PLAYLIST_OK',
}

export const playPrevSongAction: BasicAction = { type: ActionsTypes.PLAY_PREV_SONG_ACTION_TYPE };
export const playNextSongAction: BasicAction = { type: ActionsTypes.PLAY_NEXT_SONG_ACTION_TYPE };
export const createChangePlaylistActionObject = (playlist: string): PlaylistAction => ({
  type: ActionsTypes.CHANGE_PLAYLIST_ACTION_TYPE,
  playlist,
});
export const createAddPlaylistSaveActionObject = (playlist: string): PlaylistAction => ({
  type: ActionsTypes.ADD_PLAYLIST_ACTION_TYPE,
  playlist,
});
export const createAddSongToPlaylistActionObject = (playlist: string, songIndex: number): IndexPlaylistAction => ({
  type: ActionsTypes.ADD_SONG_TO_PLAYLIST_ACTION_TYPE,
  playlist,
  songIndex,
});
export const createRemoveSongFromPlaylistActionObject = (songIndex: number): IndexAction => ({
  type: ActionsTypes.REMOVE_SONG_FROM_PLAYLIST_ACTION_TYPE,
  songIndex,
});
