import { Modal, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import { State } from '../types';
import { getPlaylists, getOpenAddSongToPlaylistWindow, getSongIndexToChangePlaylist } from '../reducers';
import {addSongToPlaylistCloseWindowAction} from '../actions';


class AddSongToPlaylist extends React.Component<{ playlistsNotIncludeSongIndex: string[]; show: boolean;
dispatch: Dispatch;}> {

  render = () => {
    const { playlistsNotIncludeSongIndex, show, dispatch } = this.props;
    const sendActionCloseWindow = () => dispatch(addSongToPlaylistCloseWindowAction);
    return (
      <Modal title="Add Song to Playlist" visible={show} onOk={sendActionCloseWindow} onCancel={sendActionCloseWindow}>
          {playlistsNotIncludeSongIndex.map((playlist: string) => (
              <div key={playlist}>
                <Button className="add-song-to-playlist-button">{playlist}</Button>
                <br/>
              </div>
              ))}
      </Modal>
    );
  };
}

const getPlaylistsNotIncludeSongIndex = (playlists: {}, songIndex: number) => (
  Object.keys(playlists).filter(playlist => !(playlists[playlist].includes(songIndex)))
);


const mapStateToProps = (state: State) => ({
  playlistsNotIncludeSongIndex: getPlaylistsNotIncludeSongIndex(getPlaylists(state),
    getSongIndexToChangePlaylist(state)),
  show: getOpenAddSongToPlaylistWindow(state),
});

const ConnectedAddSongToPlaylist = connect(mapStateToProps)(AddSongToPlaylist);


export { ConnectedAddSongToPlaylist as AddSongToPlaylist };
