import * as React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import UrlPattern from 'url-pattern';

import { getViewport } from './viewport';
import { setViewport as setViewportAction } from './viewportActionCreator';
import { getLocation } from '../reducers';
import { getCurrentPlaylistName } from '../reducers';

const VIEWPORT_ONLY_URL = new UrlPattern('/:viewport');
const VIEWPORT_WITH_OBJECT_ID_URL = new UrlPattern('/:viewport/:objectId');

import { getChangePlaylistAction } from '../actions';

type StateProps = {
  viewport: string | null;
  location: {
    pathname: string;
  };
  currentPlaylistName: string;
};

type DispatchProps = {
  push: (url: string) => void;
  setViewport: (viewport: string) => void;
  setPlaylist: (newPlaylistName: string) => void;
};

type Props = StateProps & DispatchProps;

class URLSync extends React.Component<Props> {
  updateStateFromUrl = () => {
    const { location, setViewport, setPlaylist } = this.props;
    let matchResult;
    const locationPathname = encodeURI(location.pathname);

    matchResult = VIEWPORT_WITH_OBJECT_ID_URL.match(locationPathname);

    if (matchResult !== null) {
      setViewport(matchResult.viewport);
      setPlaylist(matchResult.objectId);
      return;
    }

    matchResult = VIEWPORT_ONLY_URL.match(locationPathname);

    if (matchResult !== null) {
      setViewport(matchResult.viewport);
      return;
    }

    throw new Error(`Invalid URL was given
     ${locationPathname}`);
  };

  updateUrlFromState = () => {
    const { viewport, location, push, currentPlaylistName } = this.props;
    let expectedUrl;
    if (viewport && currentPlaylistName) {
      // expectedUrl = VIEWPORT_ONLY_URL.stringify({viewport, objectId: 'hello'});
      expectedUrl = VIEWPORT_WITH_OBJECT_ID_URL.stringify({ viewport, objectId: currentPlaylistName });
    } else {
      throw new Error(`Invalid state was provided ${JSON.stringify(this.props)}, URL cannot be computed`);
    }

    expectedUrl = decodeURI(expectedUrl);
    if (expectedUrl !== location.pathname) {
      push(expectedUrl);
    }
  };

  componentWillMount() {
    const { location } = this.props;

    // Before mounting (when the app is starting) we parse the URL and update the state (if the URL is not just '/').
    if (location.pathname === '/') {
      // Default values are set by the reducers, we just need to update the URL.
      this.updateUrlFromState();
    } else {
      this.updateStateFromUrl();
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;

    // On location updates (back/forward by the user), we update the state.
    // Other updates are to the state, for which we update the URL.
    if (prevLocation !== location) {
      this.updateStateFromUrl();
    } else {
      this.updateUrlFromState();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: any) => {
  const viewport = getViewport(state.viewport);
  const location = getLocation(state);
  const currentPlaylistName = getCurrentPlaylistName(state);

  return {
    viewport,
    location,
    currentPlaylistName,
  };
};

const ConnectedURLSync = connect<StateProps, DispatchProps>(
  mapStateToProps,
  {
    push: pushAction,
    setViewport: setViewportAction,
    setPlaylist: getChangePlaylistAction,
  },
)(URLSync);

export { ConnectedURLSync as URLSync };
