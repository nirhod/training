import { ListItem, SongButton } from './StyledComponents';
import { AddSongToPlaylist } from './AddSongToPlaylist';
import * as React from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { Dispatch } from 'redux';
import { createRemoveSongFromPlaylistActionObject } from '../actions';
import { connect } from 'react-redux';
import { State } from '../types';
import { getCurrentPlaylistName, getCurrentSongIndex } from '../reducers';

const SongLine = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
`;

const RemoveSongButton = styled<any>(SongButton)`
  && {
    color: red;
    margin-left: 1em;
  }
`;

type StateProps = { shouldHighlightSong: boolean; shouldShowRemoveButton: boolean };
type DispatchProps = { removeSong: (songIndex: number) => void };
type OwnProps = { songIndex: number; songName: string };
type Props = StateProps & DispatchProps & OwnProps;

const SongItem = ({ shouldHighlightSong, shouldShowRemoveButton, removeSong, songIndex, songName }: Props) => (
  <ListItem>
    <SongLine>
      {shouldHighlightSong ? <strong>{songName}</strong> : songName}
      <div>
        <AddSongToPlaylist songIndex={songIndex} />
        {!shouldShowRemoveButton ? (
          ''
        ) : (
          <RemoveSongButton
            shape="circle"
            icon="minus"
            size="small"
            onClick={() => showRemoveSongFromPlaylistModal(() => removeSong(songIndex))}
          />
        )}
      </div>
    </SongLine>
  </ListItem>
);

function showRemoveSongFromPlaylistModal(removeSpecificSong: () => void) {
  Modal.confirm({
    title: 'Are you sure you want to remove the song from the playlist?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    maskClosable: true,
    onOk: removeSpecificSong,
  });
}

const mapStateToProps = (state: State, { songIndex, songName }: OwnProps) => ({
  songName,
  songIndex,
  shouldHighlightSong: songIndex === getCurrentSongIndex(state),
  shouldShowRemoveButton: getCurrentPlaylistName(state) !== 'All',
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeSong: (songIndex: number) => {
    dispatch(createRemoveSongFromPlaylistActionObject(songIndex));
  },
});

const SongItemConnected = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SongItem);
export { SongItemConnected as SongItem };
