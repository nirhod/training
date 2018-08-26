import { List, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import { songsNamesList } from '../data';
import { State } from '../types';
import {AddSongToPlaylist} from './AddSongToPlaylist';
import {addSongToPlaylistOpenWindowAction} from '../actions';


const SongsList = ({ songsToDisplay, currentSongIndex, dispatch }:
                     { songsToDisplay: string[]; currentSongIndex: number; dispatch: Dispatch}) => {
  const songToComponent = (song: string, index: number) => (
    <List.Item className="song-item">
      <div className="song">

        {currentSongIndex === index ? <strong>{song}</strong> : song}

        <div className="song-buttons">
          <Button className="add-song-button song-button" shape="circle" icon="plus" size="small"
          onClick={() => dispatch(addSongToPlaylistOpenWindowAction(index))}/>
          <Button className="remove-song-button song-button" shape="circle" icon="minus" size="small"/>
        </div>

        <AddSongToPlaylist/>

      </div>

    </List.Item>
  );
  return (
    <div className="songsList">
      <List
        dataSource={songsToDisplay}
        renderItem={songToComponent}
        bordered={true}
      />
    </div>
  );
};

const SongsListConnected = connect((state: State) => ({
  songsToDisplay: getSongsByPlaylist(state.songsListState.currentPlaylistName, state.songsListState.playlists),
  currentSongIndex: state.songsListState.currentSongIndex,
}))(SongsList);
export { SongsListConnected as SongsList };


const getSongsByPlaylist = (playlist: string, playlists: {}): string[] =>
  playlists[playlist].map((index: number) => songsNamesList[index]);