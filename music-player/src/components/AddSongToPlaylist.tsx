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

type StateProps = { playlistsNotIncludeSongIndex: string[] };
type DispatchProps = { addSongToPlaylist: (playlist: string) => void} ;
type OwnProps = { songIndex: number};
type Props = StateProps & DispatchProps;

class AddSongToPlaylist extends React.Component<Props, { showModal: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { showModal: false };
  }

  closeModal = () => this.setState({ showModal: false });

  render() {
    const { playlistsNotIncludeSongIndex, addSongToPlaylist } = this.props;
    return (
      <span>
        <AddSongButton shape="circle" icon="plus" size="small" onClick={() => this.setState({ showModal: true })} />
        <Modal
          title="Add Song to Playlist"
          visible={this.state.showModal}
          onCancel={this.closeModal}
          footer={[
            <Button key="cancel" type="primary" onClick={this.closeModal}>
              CANCEL
            </Button>,
          ]}
        >
          {!this.state.showModal
            ? ''
            : playlistsNotIncludeSongIndex.length === 0
              ? 'All playlists have the song.'
              : playlistsNotIncludeSongIndex.map((playlist: string) => (
                  <div key={playlist}>
                    <ChoosePlaylistButton
                      onClick={() => {
                        addSongToPlaylist(playlist);
                        this.closeModal();
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

const mapStateToProps = (state: State, { songIndex }: { songIndex: number }) => ({
  playlistsNotIncludeSongIndex: getPlaylistsNotIncludeSongIndex(getPlaylists(state), songIndex),
});

const mapDispatchToProps = (dispatch: Dispatch, { songIndex }: { songIndex: number }) => ({
  addSongToPlaylist: (playlist: string) => dispatch(createAddSongToPlaylistActionObject(playlist, songIndex)),
});

const ConnectedAddSongToPlaylist = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(AddSongToPlaylist);

export { ConnectedAddSongToPlaylist as AddSongToPlaylist };
