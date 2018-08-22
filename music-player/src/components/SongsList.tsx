import {List} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';

import {songsNamesList} from '../data';
import {State} from '../types';


const SongsList = ({currentSongIndex, playlists, currentPlaylist}: State) => {
    const songToComponent = (song: string, index: number) => (
        currentSongIndex === index ?
            <List.Item><strong>{song}</strong></List.Item> :
            <List.Item>{song}</List.Item>
    );

    const getSongsByPlaylist = (playlist: string): [string] =>
        playlists[playlist].map((index: number) => songsNamesList[index]);

    return (
        <div className="songsList">
            <List
                dataSource={getSongsByPlaylist(currentPlaylist)}
                renderItem={songToComponent}
                bordered={true}
            />
        </div>
    )
};

const SongsListConnected = connect((state: State) => state)(SongsList);
export {SongsListConnected as SongsList};
