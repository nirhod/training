import * as React from 'react';
import { connect } from 'react-redux';

import { MusicController } from './components/MusicController';
import { PlaylistMenu } from './components/PlaylistMenu';
import { SongsList } from './components/SongsList';
import { State } from './types';
import { getCurrentPlaylistName } from './reducers';
import { URLSync } from './forUrl/urlSync';
import { getCurrentSongIndex } from './reducers';
import styled from 'styled-components';

const Header = styled.header`
  text-align: center;
  margin: 2em;
`;

const Menus = styled.div`
  display: flex;
`;

const App = ({ currentSongIndex, currentPlaylistName }: { currentSongIndex: number; currentPlaylistName: string }) => {
  if (currentSongIndex === -1) {
    return <h1>Wrong URL!!!</h1>;
  }
  return (
    <div>
      <URLSync />
      <Header>
        <h1>Music Player</h1>
        <h3>Playlist: {currentPlaylistName}</h3>
        <MusicController />
      </Header>
      <Menus>
        <PlaylistMenu />
        <SongsList />
      </Menus>
    </div>
  );
};

const AppConnected = connect((state: State) => ({
  currentSongIndex: getCurrentSongIndex(state),
  currentPlaylistName: getCurrentPlaylistName(state),
}))(App);
export default AppConnected;
