import {List,} from 'antd';
import * as React from 'react';
import './App.css';
import {songsList} from './data';
import {MusicController} from './MusicController';
import {connectComponentToCurrentSongIndex} from './utils'


const App = ({currentSongIndex}: { currentSongIndex: number }) => {
    const songToComponent = (song: string, index: number) => (
        currentSongIndex === index ?
            <List.Item><strong>{song}</strong></List.Item> :
            <List.Item>{song}</List.Item>
    );

    return (
        <div className="musicPlayer">
            <header className="header">
                <h1>Music Player</h1>
                <MusicController />
            </header>
            <List
                dataSource={songsList}
                renderItem={songToComponent}
                bordered={true}
            />
        </div>
    );
};


const AppConnected = connectComponentToCurrentSongIndex(App);

export default AppConnected;
