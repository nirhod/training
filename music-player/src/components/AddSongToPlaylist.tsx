import { Modal, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../types';
import { getPlaylists } from '../reducers';
import { getAddSongToPlaylistAction } from '../actions';

class AddSongToPlaylist extends React.Component<
  {
    playlistsNotIncludeSongIndex: string[];
    realIndex: number;
    dispatch: Dispatch;
  },
  { show: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { show: false };
  }

  closeWindowFunction = () => this.setState({ show: false });

  render = () => {
    const { playlistsNotIncludeSongIndex, dispatch } = this.props;
    return (
      <span>
        <Button
          className="song-button add-song-button"
          shape="circle"
          icon="plus"
          size="small"
          onClick={() => this.setState({ show: true })}
        />
        <Modal
          title="Add Song to Playlist"
          visible={this.state.show}
          onCancel={this.closeWindowFunction}
          footer={[
            <Button key="ok" type="primary" onClick={this.closeWindowFunction}>
              OK
            </Button>,
          ]}
        >
          {!this.state.show
            ? ''
            : playlistsNotIncludeSongIndex.length === 0
              ? 'All playlists have the song.'
              : playlistsNotIncludeSongIndex.map((playlist: string) => (
                  <div key={playlist}>
                    <Button
                      className="add-song-to-playlist-button"
                      onClick={() => {
                        dispatch(getAddSongToPlaylistAction(playlist, this.props.realIndex));
                        this.closeWindowFunction();
                      }}
                    >
                      {playlist}
                    </Button>
                    <br />
                  </div>
                ))}
        </Modal>
      </span>
    );
  };
}

const getPlaylistsNotIncludeSongIndex = (playlists: {}, songIndex: number): string[] =>
  Object.keys(playlists).filter(playlist => !playlists[playlist].includes(songIndex));

const mapStateToProps = (state: State, { realIndex }: { realIndex: number }) => ({
  playlistsNotIncludeSongIndex: getPlaylistsNotIncludeSongIndex(getPlaylists(state), realIndex),
  realIndex,
});

const ConnectedAddSongToPlaylist = connect(mapStateToProps)(AddSongToPlaylist);

export { ConnectedAddSongToPlaylist as AddSongToPlaylist };
