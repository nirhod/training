import {Modal, Input} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {addPlaylistCancelAction, addPlaylistSaveAction} from '../actions';
import {getOpenAddPlaylistWindow} from '../reducers';
import {State} from '../types';

class AddPlaylist extends React.Component<{show: boolean; dispatch: Dispatch}> {
  myRef: any;

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }

  render = () => (
    <div>
      <Modal title="Add New Playlist" okText="Save" visible={this.props.show}
             onOk={() => this.props.dispatch(addPlaylistSaveAction(this.myRef.current.input.value))}
             onCancel={() => this.props.dispatch(addPlaylistCancelAction)}>

        <Input placeholder="PlaylistName" ref={this.myRef} />

      </Modal>
    </div>
  );
}

const ConnectedAddPlaylist = connect((state: State) =>
  ({show: getOpenAddPlaylistWindow(state)}))(AddPlaylist);
export {ConnectedAddPlaylist as AddPlaylist}





