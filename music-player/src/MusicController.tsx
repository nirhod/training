import {Button, Icon} from 'antd';
import * as React from 'react';
import {songsList} from './data';
import {MusicControllerProps, Song} from './types';
import {playNextSongAction, playPrevSongAction} from './actions';
import {connectComponentToCurrentSongIndex} from './utils';


const MusicController = ({currentSongIndex, dispatch}: MusicControllerProps) => {
    const currentSongName = getSongByIndex(currentSongIndex).name;
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

const getSongByIndex = (index: number): Song =>
    songsList.filter((song: Song) => song.index === index)[0];

const ConnectedMusicController = connectComponentToCurrentSongIndex(MusicController);
export {ConnectedMusicController as MusicController};

