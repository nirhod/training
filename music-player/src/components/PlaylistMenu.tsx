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

type StateProps = { playlistsNames: string[] };
type DispatchProps = { changePlaylist: (newPlaylist: string) => void };
type Props = StateProps & DispatchProps;

const PlaylistMenu = ({ playlistsNames, changePlaylist }: Props) => (
  <SideMenu>
    <MenuAntd defaultSelectedKeys={['All']} onSelect={item => changePlaylist(item.key)}>
      <MenuAntd.ItemGroup title={menuHeader}>
        {playlistsNames.map(playlistName => (
          <MenuAntd.Item key={playlistName}>{playlistName}</MenuAntd.Item>
        ))}
      </MenuAntd.ItemGroup>
    </MenuAntd>
  </SideMenu>
);

const menuHeader = (
  <SideMenuHeader>
    Playlists
    <AddPlaylist />
  </SideMenuHeader>
);

const mapStateToProps = (state: State): StateProps => ({
  playlistsNames: Object.keys(getPlaylists(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changePlaylist: (newPlaylist: string) => dispatch(createChangePlaylistActionObject(newPlaylist)),
});

const PlaylistMenuConnected = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistMenu);
export { PlaylistMenuConnected as PlaylistMenu };
