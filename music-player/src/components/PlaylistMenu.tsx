import { Menu as MenuAntd } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { createChangePlaylistActionObject } from '../actions';
import { AddPlaylist } from './AddPlaylist';
import { State } from '../types';
import { getPlaylists } from '../reducers';
import styled from 'styled-components';

const SideMenu = styled.div`
  width: 10%;
`;

const SideMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlaylistMenu = ({ playlistsNames, dispatch }: { playlistsNames: string[]; dispatch: Dispatch }) => (
  <SideMenu>
    <MenuAntd defaultSelectedKeys={['All']} onSelect={item => dispatch(createChangePlaylistActionObject(item.key))}>
      <MenuAntd.ItemGroup title={menuHeader(dispatch)}>
        {playlistsNames.map(playlistName => (
          <MenuAntd.Item key={playlistName}>{playlistName}</MenuAntd.Item>
        ))}
      </MenuAntd.ItemGroup>
    </MenuAntd>
  </SideMenu>
);

const PlaylistMenuConnected = connect(
  (state: State): { playlistsNames: string[] } => ({
    playlistsNames: Object.keys(getPlaylists(state)),
  }),
)(PlaylistMenu);
export { PlaylistMenuConnected as PlaylistMenu };

const menuHeader = (dispatch: Dispatch) => (
  <SideMenuHeader>
    Playlists
    <AddPlaylist />
  </SideMenuHeader>
);
