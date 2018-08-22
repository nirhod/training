import * as React from 'react';
import {connect} from 'react-redux';

import './App.css';

import {MusicController} from './MusicController';
import {PlaylistMenu} from './PlaylistMenu';
import {SongsList} from './SongsList';
import {State} from './types';


const App = ({currentSongIndex, currentPlaylist}:
                 { currentSongIndex: number; currentPlaylist: string }) => {


    return (
        <div className="musicPlayer">
            <header className="header">
                <h1>Music Player</h1>
                <h3>Playlist: {currentPlaylist}</h3>
                <MusicController/>
            </header>
            <div className="main">
                <PlaylistMenu/>
                <SongsList/>
            </div>
        </div>
    );
};


const AppConnected = connect((state: State) => state)(App);

export default AppConnected;
