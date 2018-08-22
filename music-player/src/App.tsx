import {List} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';

import './App.css';
import {songsList} from './data';
import {MusicController} from './MusicController';
import {PlaylistMenu} from './PlaylistMenu';
import {State} from './types';



const App = ({currentSongIndex, currentPlaylist, playlists}:
                 { currentSongIndex: number; currentPlaylist: string; playlists: {} }) => {
    const songToComponent = (song: string, index: number) => (
        currentSongIndex === index ?
            <List.Item><strong>{song}</strong></List.Item> :
            <List.Item>{song}</List.Item>
    );

    return (
        <div className="musicPlayer">
            <header className="header">
                <h1>Music Player</h1>
                <h3>Playlist: {currentPlaylist}</h3>
                <MusicController/>
            </header>
            <div className="main">
                <PlaylistMenu />
                <div className="songsList">
                    <List
                        dataSource={songsList}
                        renderItem={songToComponent}
                        bordered={true}
                    />
                </div>
            </div>
        </div>
    );
};


const AppConnected = connect((state: State) => state)(App);

export default AppConnected;
