import {Button, Icon} from 'antd';
import {Dispatch} from 'redux';
import * as React from 'react';
import {connect} from 'react-redux';

import {playNextSongAction, playPrevSongAction} from '../actions';
import {songsNamesList} from '../data';
import {State} from '../types';
import {getCurrentSongIndex} from '../selectors';


const MusicController = ({currentSongIndex, currentSongName, dispatch}:
                             { currentSongIndex: number; currentSongName: string; dispatch: Dispatch }) => (
    <div>
        <h2>{currentSongName}</h2>
        <audio controls={true} key={currentSongIndex}>
            <source src={`/songs/${currentSongName}`} type="audio/mpeg"/>
            Your browser does not support the audio tag.
        </audio>
        <br/>
        <Button.Group>
            <Button onClick={() => dispatch(playPrevSongAction)}><Icon type="step-backward"/></Button>
            <Button onClick={() => dispatch(playNextSongAction)}><Icon type="step-forward"/></Button>
        </Button.Group>
    </div>
);


const ConnectedMusicController = connect((state: State) => {
    const currentSongIndex = getCurrentSongIndex(state);
    return ({
        currentSongIndex,
        currentSongName: songsNamesList[currentSongIndex]
    })
})(MusicController);
export {ConnectedMusicController as MusicController};
