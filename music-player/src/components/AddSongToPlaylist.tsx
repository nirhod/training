import { Modal, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../types';
import { getPlaylists } from '../reducers';
import { createAddSongToPlaylistActionObject } from '../actions';
import { SongButton } from './StyledComponents';
import styled from 'styled-components';

const AddSongButton = styled<any>(SongButton)`
  && {
    color: green;
  }
`;

const ChoosePlaylistButton = styled<any>(Button)`
  width: 30%;
  margin-bottom: 1em;
  text-align: left;
`;

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
        <AddSongButton
          className="song-button"
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
                    <ChoosePlaylistButton
                      onClick={() => {
                        dispatch(createAddSongToPlaylistActionObject(playlist, this.props.realIndex));
                        this.closeWindowFunction();
                      }}
                    >
                      {playlist}
                    </ChoosePlaylistButton>
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
