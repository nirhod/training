import {connect} from 'react-redux';
import {State} from './types';
import * as React from 'react';


export const connectComponentToCurrentSongIndex = (component: React.SFC<{currentSongIndex: number}>) =>
    connect((state: State) => ({...state}))(component);
