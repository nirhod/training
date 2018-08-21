import {List,} from 'antd';
import * as React from 'react';
import './App.css';
import {songsList} from './data';
import {MusicController} from './MusicController';
import {Song} from './types';
import {connectComponentToCurrentSongIndex} from './utils'


const App = ({currentSongIndex}: { currentSongIndex: number }) => {
    const songToComponent = (item: Song) => (
        currentSongIndex === item.index ?
            <List.Item><strong>{item.name}</strong></List.Item> :
            <List.Item>{item.name}</List.Item>
    );

    return (
        <div className="musicPlayer">
            <header className="header">
                <h1>Music Player</h1>
                <MusicController/>
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
