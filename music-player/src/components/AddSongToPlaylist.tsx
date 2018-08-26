import { Modal, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
// import {Dispatch} from 'redux';

import { State } from '../types';
import { getPlaylists, getOpenAddSongToPlaylistWindow, getSongIndexToChangePlaylist } from '../reducers';


class AddSongToPlaylist extends React.Component<{ playlists: {}; show: boolean; songIndexToChangePlaylist: number }> {

  render = () => {
    const { playlists, show, songIndexToChangePlaylist } = this.props;
    return (
      <Modal title="Add Song to Playlist" visible={show}>
        <div className="add-song-to-playlist-buttons">
          {Object.keys(playlists).
          filter(playlist => !(playlists[playlist].includes(songIndexToChangePlaylist))).
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


const ConnectedAddSongToPlaylist = connect((state: State) => ({
  playlists: getPlaylists(state),
  show: getOpenAddSongToPlaylistWindow(state),
  songIndexToChangePlaylist: getSongIndexToChangePlaylist(state),
}))(AddSongToPlaylist);

export { ConnectedAddSongToPlaylist as AddSongToPlaylist };
