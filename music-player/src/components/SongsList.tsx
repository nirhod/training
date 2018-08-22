import {List} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';

import {songsNamesList} from '../data';
import {State} from '../types';


const SongsList = ({songsToDisplay, currentSongIndex}: {songsToDisplay: string[]; currentSongIndex: number}) => {
    const songToComponent = (song: string, index: number) => (
        currentSongIndex === index ?
            <List.Item><strong>{song}</strong></List.Item> :
            <List.Item>{song}</List.Item>
    );
    return (
        <div className="songsList">
            <List
                dataSource={songsToDisplay}
                renderItem={songToComponent}
                bordered={true}
            />
        </div>
    )
};

const SongsListConnected = connect((state: State) => ({
    songsToDisplay: getSongsByPlaylist(state.songsListState.currentPlaylist, state.songsListState.playlists),
    currentSongIndex: state.songsListState.currentSongIndex
}))(SongsList);
export {SongsListConnected as SongsList};


const getSongsByPlaylist = (playlist: string, playlists: {}): string[] =>
    playlists[playlist].map((index: number) => songsNamesList[index]);