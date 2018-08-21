import {Button, Icon} from 'antd';
import * as React from 'react';
import {songsList} from './data';
import {MusicControllerState, Song} from './types';


export const MusicController = ({currentSongIndex, playPrevSong, playNextSong}: MusicControllerState) => {
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
                <Button onClick={playPrevSong}><Icon type="step-backward"/></Button>
                <Button onClick={playNextSong}><Icon type="step-forward"/></Button>
            </Button.Group>
        </div>
    )
};

const getSongByIndex = (index: number): Song =>
    songsList.filter((song: Song) => song.index === index)[0];