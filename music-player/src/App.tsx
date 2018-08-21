import {List,} from 'antd';
import * as React from 'react';
import './App.css';
import {songsList} from './data';
import {MusicController} from './MusicController';
import {Song, State} from './types';


class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {currentSongIndex: 0};
    }

    render() {
        return (
            <div className="musicPlayer">
                <header className="header">
                    <h1>Music Player</h1>
                    <MusicController currentSongIndex={this.state.currentSongIndex}
                                     playNextSong={this.playNextSong} playPrevSong={this.playPrevSong}/>
                </header>
                <List
                    dataSource={songsList}
                    renderItem={this.songToComponent}
                    bordered={true}
                />
            </div>
        );
    }

    songToComponent = (item: Song) => (
        this.state.currentSongIndex === item.index ?
            <List.Item><strong>{item.name}</strong></List.Item> :
            <List.Item>{item.name}</List.Item>
    );

    playNextSong = () => this.setState({
        currentSongIndex: (this.state.currentSongIndex + 1) % songsList.length
    });
    playPrevSong = () => this.setState({
        currentSongIndex: this.state.currentSongIndex !== 0 ?
            (this.state.currentSongIndex - 1) : songsList.length - 1
    });
}


export default App;
