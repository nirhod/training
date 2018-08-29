import { List } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { songsNamesList } from '../data';
import { State } from '../types';
import { AddSongToPlaylist } from './AddSongToPlaylist';
import { showDeleteConfirm } from './RemoveSongFromPlaylist';
import { getPlaylists, getCurrentPlaylistName, getCurrentSongIndex } from '../reducers';
import styled from 'styled-components';
import { SongButton, ListItem } from './StyledComponents';

const MainMenu = styled.div`
  width: 90%;
`;

const SongLine = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
`;

const RemoveSongButton = styled<any>(SongButton)`
  && {
    color: red;
    margin-left: 1em;
  }
`;

const SongsList = ({
  songsToDisplay,
  currentSongIndex,
  dispatch,
  songsIndices,
  currentPlaylistName,
}: {
  songsToDisplay: string[];
  currentSongIndex: number;
  dispatch: Dispatch;
  songsIndices: number[];
  currentPlaylistName: string;
}) => {
  const songToComponent = (song: string, indexInPlaylist: number) => {
    const realIndex = songsIndices[indexInPlaylist];
    return (
      <ListItem>
        <SongLine>
          {currentSongIndex === realIndex ? <strong>{song}</strong> : song}
          <div>
            <AddSongToPlaylist realIndex={realIndex} />
            {currentPlaylistName === 'All' ? (
              ''
            ) : (
              <RemoveSongButton
                shape="circle"
                icon="minus"
                size="small"
                onClick={() => showDeleteConfirm(dispatch, realIndex)}
              />
            )}
          </div>
        </SongLine>
      </ListItem>
    );
  };
  return (
    <MainMenu>
      <List dataSource={songsToDisplay} renderItem={songToComponent} bordered={true} />
    </MainMenu>
  );
};

const mapStateToProps = (state: State) => {
  const currentPlaylistName = getCurrentPlaylistName(state);
  const playlists = getPlaylists(state);
  return {
    songsToDisplay: getSongsByPlaylist(currentPlaylistName, playlists),
    currentSongIndex: getCurrentSongIndex(state),
    songsIndices: playlists[currentPlaylistName],
    currentPlaylistName,
  };
};

const SongsListConnected = connect(mapStateToProps)(SongsList);
export { SongsListConnected as SongsList };

const getSongsByPlaylist = (playlist: string, playlists: {}): string[] =>
  playlists[playlist].map((index: number) => songsNamesList[index]);
