import { List, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { songsNamesList } from '../data';
import { State } from '../types';
import { AddSongToPlaylist } from './AddSongToPlaylist';
import { addSongToPlaylistOpenWindowAction } from '../actions';
import { getPlaylists, getCurrentPlaylistName, getCurrentSongIndex } from '../reducers';


const SongsList = ({ songsToDisplay, currentSongIndex, dispatch, songsIndices }:
                     {
                       songsToDisplay: string[];
                       currentSongIndex: number;
                       dispatch: Dispatch;
                       songsIndices: number[];
                     }) => {
  const songToComponent = (song: string, indexInPlaylist: number) => {
    const realIndex = songsIndices[indexInPlaylist];
    return (
      <List.Item className="song-item">
        <div className="song">

          {currentSongIndex === realIndex ? <strong>{song}</strong> : song}

          <div className="song-buttons">
            <Button className="add-song-button song-button" shape="circle" icon="plus" size="small"
                    onClick={() => dispatch(addSongToPlaylistOpenWindowAction(realIndex))}/>
            <Button className="remove-song-button song-button" shape="circle" icon="minus" size="small"/>
          </div>

          <AddSongToPlaylist/>

        </div>

      </List.Item>
    );
  };
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

const mapStateToProps = (state: State) => {
  const currentPlaylistName = getCurrentPlaylistName(state);
  const playlists = getPlaylists(state);
  return ({
    songsToDisplay: getSongsByPlaylist(currentPlaylistName, playlists),
    currentSongIndex: getCurrentSongIndex(state),
    songsIndices: playlists[currentPlaylistName],
  });
};

const SongsListConnected = connect(mapStateToProps)(SongsList);
export { SongsListConnected as SongsList };


const getSongsByPlaylist = (playlist: string, playlists: {}): string[] =>
  playlists[playlist].map((index: number) => songsNamesList[index]);