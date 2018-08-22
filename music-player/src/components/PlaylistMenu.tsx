import {Menu as MenuAntd} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getChangePlaylistAction} from '../actions';
import {State} from '../types';

const PlaylistMenu = ({playlists, dispatch}: { playlists: {}; dispatch: Dispatch }) => (
    <div className="menu">
        <MenuAntd defaultSelectedKeys={['All']}
                  onSelect={(item) => {dispatch(getChangePlaylistAction(item.key))}}>

            {Object.keys(playlists).map((playlistName) =>
                <MenuAntd.Item key={playlistName}>{playlistName}</MenuAntd.Item>)}

        </MenuAntd>
    </div>
);

const PlaylistMenuConnected = connect((state: State) => state)(PlaylistMenu);
export {PlaylistMenuConnected as PlaylistMenu};