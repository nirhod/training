import { Modal, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../types';
import { getPlaylists, getOpenAddSongToPlaylistWindow, getSongIndexToChangePlaylist } from '../reducers';
import { addSongToPlaylistCloseWindowAction, addSongToPlaylistAction } from '../actions';


class AddSongToPlaylist extends React.Component<{
  playlistsNotIncludeSongIndex: string[]; show: boolean;
  dispatch: Dispatch;
}> {

  render = () => {
    const { playlistsNotIncludeSongIndex, show, dispatch } = this.props;

    // console.log(playlistsNotIncludeSongIndex);

    const sendActionCloseWindow = () => dispatch(addSongToPlaylistCloseWindowAction);
    return (
      <Modal title="Add Song to Playlist" visible={show} onOk={sendActionCloseWindow} onCancel={sendActionCloseWindow}>
        {playlistsNotIncludeSongIndex.map((playlist: string) => (
          <div key={playlist}>
            <Button className="add-song-to-playlist-button"
                    onClick={() => dispatch(addSongToPlaylistAction(playlist))}>
              {playlist}
            </Button>
            <br/>
          </div>
        ))}
      </Modal>
    );
  };
}

const getPlaylistsNotIncludeSongIndex = (playlists: {}, songIndex: number) => (
  Object.keys(playlists).filter(playlist => {
    return !(playlists[playlist].includes(songIndex))})
);


const mapStateToProps = (state: State) => {
  console.log(state)
  console.log(getPlaylistsNotIncludeSongIndex(getPlaylists(state),
    getSongIndexToChangePlaylist(state)));
  return {
  playlistsNotIncludeSongIndex: getPlaylistsNotIncludeSongIndex(getPlaylists(state),
    getSongIndexToChangePlaylist(state)),
  show: getOpenAddSongToPlaylistWindow(state),
}};

const ConnectedAddSongToPlaylist = connect(mapStateToProps)(AddSongToPlaylist);


export { ConnectedAddSongToPlaylist as AddSongToPlaylist };
