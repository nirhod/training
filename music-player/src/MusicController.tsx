import {Button, Icon} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';

import {songsList} from './data';
import {MusicControllerProps, State} from './types';
import {playNextSongAction, playPrevSongAction} from './actions';


const MusicController = ({currentSongIndex, dispatch}: MusicControllerProps) => {
    const currentSongName = songsList[currentSongIndex];
    return (
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
    )
};


const ConnectedMusicController = connect((state: State) => state)(MusicController);
export {ConnectedMusicController as MusicController};

