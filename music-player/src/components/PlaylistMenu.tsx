import { Menu as MenuAntd } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getChangePlaylistAction } from '../actions';
import { AddPlaylist } from './AddPlaylist';
import { State } from '../types';
import { getPlaylists } from '../reducers';

const PlaylistMenu = ({ playlistsNames, dispatch }: { playlistsNames: string[]; dispatch: Dispatch }) => (
  <div className="menu">
    <MenuAntd defaultSelectedKeys={['All']} onSelect={item => dispatch(getChangePlaylistAction(item.key))}>
      <MenuAntd.ItemGroup title={menuHeader(dispatch)}>
        {playlistsNames.map(playlistName => (
          <MenuAntd.Item key={playlistName}>{playlistName}</MenuAntd.Item>
        ))}
      </MenuAntd.ItemGroup>
    </MenuAntd>

  </div>
);

const PlaylistMenuConnected = connect(
  (state: State): { playlistsNames: string[] } => ({
    playlistsNames: Object.keys(getPlaylists(state)),
  }),
)(PlaylistMenu);
export { PlaylistMenuConnected as PlaylistMenu };

const menuHeader = (dispatch: Dispatch) => (
  <div className="menu-header">
    Playlists
    <AddPlaylist />
  </div>
);
