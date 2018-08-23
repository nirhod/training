import { Button, Icon, Menu as MenuAntd } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getChangePlaylistAction } from '../actions';
import { State } from '../types';
import { getPlaylists } from '../reducers';

const PlaylistMenu = ({ playlistsNames, dispatch }: { playlistsNames: string[]; dispatch: Dispatch }) => (
  <div className="menu">
    <MenuAntd
      defaultSelectedKeys={['All']}
      onSelect={item => {
        dispatch(getChangePlaylistAction(item.key));
      }}
    >
      <MenuAntd.ItemGroup title={menuHeader}>
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

const menuHeader = (
  <div className="menu-header">
    Playlists
    <Button>
      <Icon type="plus-square"/>
    </Button>
  </div>
);