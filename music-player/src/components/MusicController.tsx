import { Button, Icon } from 'antd';
import { Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';

import { playNextSongAction, playPrevSongAction } from '../actions';
import { songsNamesList } from '../data';
import { State } from '../types';
import { getCurrentSongIndex } from '../reducers';

type StateProps = {
  currentSongName: string;
};

type DispatchProps = {
  playPrevSong: () => void;
  playNexSong: () => void;
};

type Props = StateProps & DispatchProps;

const MusicController = ({ currentSongName, playPrevSong, playNexSong }: Props) => (
  <div>
    <h2>{currentSongName}</h2>
    <audio controls={true} key={currentSongName}>
      <source src={`/songs/${currentSongName}`} type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <br />
    <Button.Group>
      <Button onClick={playPrevSong}>
        <Icon type="step-backward" />
      </Button>
      <Button onClick={playNexSong}>
        <Icon type="step-forward" />
      </Button>
    </Button.Group>
  </div>
);

const mapStateToProps = (state: State) => {
  const currentSongIndex = getCurrentSongIndex(state);
  return {
    currentSongName: songsNamesList[currentSongIndex],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  playPrevSong: () => dispatch(playPrevSongAction),
  playNexSong: () => dispatch(playNextSongAction),
});

const ConnectedMusicController = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicController);
export { ConnectedMusicController as MusicController };
