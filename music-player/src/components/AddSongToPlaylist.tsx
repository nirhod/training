import { Modal, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import { State } from '../types';
import { getPlaylists, getOpenAddSongToPlaylistWindow, getSongIndexToChangePlaylist } from '../reducers';
import {addSongToPlaylistCloseWindowAction} from '../actions';


class AddSongToPlaylist extends React.Component<{ playlists: {}; show: boolean; songIndexToChangePlaylist: number;
dispatch: Dispatch;}> {

  render = () => {
    const { playlists, show, songIndexToChangePlaylist, dispatch } = this.props;
    const sendActionCloseWindow = () => dispatch(addSongToPlaylistCloseWindowAction);
    return (
      <Modal title="Add Song to Playlist" visible={show} onOk={sendActionCloseWindow} onCancel={sendActionCloseWindow}>
        <div className="add-song-to-playlist-buttons">
          {getPlaylistsNotIncludeSongIndex(playlists, songIndexToChangePlaylist).
            map(playlist => (
              <div key={playlist}>
                <Button className="add-song-to-playlist-button">{playlist}</Button>
                <br/>
              </div>
              ))}
        </div>
      </Modal>
    );
  };
}

const getPlaylistsNotIncludeSongIndex = (playlists: {}, songIndex: number) => (
  Object.keys(playlists).filter(playlist => !(playlists[playlist].includes(songIndex)))
);


const mapStateToProps = (state: State) => ({
  playlists: getPlaylists(state),
  show: getOpenAddSongToPlaylistWindow(state),
  songIndexToChangePlaylist: getSongIndexToChangePlaylist(state),
});

const ConnectedAddSongToPlaylist = connect(mapStateToProps)(AddSongToPlaylist);


export { ConnectedAddSongToPlaylist as AddSongToPlaylist };
