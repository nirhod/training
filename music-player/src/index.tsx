import {songsNamesList} from './data';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';


const store = createStore(reducer, {
    currentSongIndex: 0,
    currentPlaylist: 'All',
    playlists: {
        All: songsNamesList.map((name, index) => index),
        'First Songs': [0, 1]
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
