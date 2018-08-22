import {List} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';

import {songsList as songsListData} from '../data';
import {State} from '../types';


const SongsList = ({currentSongIndex} : {currentSongIndex: number}) => {
    const songToComponent = (song: string, index: number) => (
        currentSongIndex === index ?
            <List.Item><strong>{song}</strong></List.Item> :
            <List.Item>{song}</List.Item>
    );
    return (
        <div className="songsList">
            <List
                dataSource={songsListData}
                renderItem={songToComponent}
                bordered={true}
            />
        </div>
    )
};

const SongsListConnected = connect((state: State) => state)(SongsList);
export {SongsListConnected as SongsList};