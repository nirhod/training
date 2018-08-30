import { List } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { songsNamesList } from '../data';
import { State } from '../types';
import { getCurrentPlaylistName, getPlaylists } from '../reducers';
import { SongItem } from './SongItem';

const MainMenu = styled.div`
  width: 90%;
`;

type StateProps = {
  songsToDisplay: string[];
  songsIndices: number[];
  showRemoveButton: boolean;
};
type Props = StateProps;

const SongsList = ({ songsToDisplay, songsIndices }: Props) => {
  return (
    <MainMenu>
      <List
        dataSource={songsToDisplay}
        bordered={true}
        renderItem={(songName: string, indexInPlaylist: number) => (
          <SongItem songName={songName} songIndex={songsIndices[indexInPlaylist]} />
        )}
      />
    </MainMenu>
  );
};

const mapStateToProps = (state: State) => {
  const currentPlaylistName = getCurrentPlaylistName(state);
  const playlists = getPlaylists(state);
  return {
    songsToDisplay: getSongsByPlaylist(currentPlaylistName, playlists),
    songsIndices: playlists[currentPlaylistName],
    showRemoveButton: currentPlaylistName === 'All',
  };
};

const SongsListConnected = connect<StateProps>(mapStateToProps)(SongsList);
export { SongsListConnected as SongsList };

const getSongsByPlaylist = (playlist: string, playlists: {}): string[] =>
  playlists[playlist].map((index: number) => songsNamesList[index]);
