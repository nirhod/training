import { Button, Icon, Menu as MenuAntd } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getChangePlaylistAction } from '../actions';
import { State } from '../types';
import { getPlaylists } from '../selectors';

const PlaylistMenu = ({ playlistsNames, dispatch }: { playlistsNames: string[]; dispatch: Dispatch }) => (
  <div className="menu">
    <MenuAntd
      defaultSelectedKeys={['All']}
      onSelect={item => {
        dispatch(getChangePlaylistAction(item.key));
      }}
    >
      <MenuAntd.ItemGroup title="Playlists">
        {playlistsNames.map(playlistName => (
          <MenuAntd.Item key={playlistName}>{playlistName}</MenuAntd.Item>
        ))}
      </MenuAntd.ItemGroup>
    </MenuAntd>
    <Button className="add-playlist-button">
      <Icon type="plus-square" />
    </Button>
  </div>
);

const PlaylistMenuConnected = connect(
  (state: State): { playlistsNames: string[] } => ({
    playlistsNames: Object.keys(getPlaylists(state)),
  }),
)(PlaylistMenu);
export { PlaylistMenuConnected as PlaylistMenu };
