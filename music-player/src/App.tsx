import * as React from 'react';
import {connect} from 'react-redux';

import './App.css';
import {MusicController} from './components/MusicController';
import {PlaylistMenu} from './components/PlaylistMenu';
import {SongsList} from './components/SongsList';
import {State} from './types';
import {getCurrentPlaylistName} from './reducers';
import {URLSync} from './forUrl/urlSync';
import { getCurrentSongIndex } from './reducers';


const App = ({currentSongIndex, currentPlaylistName}: {currentSongIndex: number; currentPlaylistName: string}) => {
    console.log(URLSync);
    if (currentSongIndex === -1) {
      return <h1>Wrong URL!!!</h1>
    }
    return (
        <div className="musicPlayer">
            <URLSync />
            <header className="header">
                <h1>Music Player</h1>
                <h3>Playlist: {currentPlaylistName}</h3>
                <MusicController/>
            </header>
            <div className="main">
                <PlaylistMenu/>
                <SongsList/>
            </div>
        </div>
    );
};


const AppConnected = connect((state: State) => ({
    currentSongIndex: getCurrentSongIndex(state),
    currentPlaylistName: getCurrentPlaylistName(state)
}))(App);
export default AppConnected;
