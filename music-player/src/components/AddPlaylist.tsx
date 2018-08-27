import { Modal, Input } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addPlaylistCancelAction, addPlaylistSaveAction } from '../actions';
import { getOpenAddPlaylistWindow } from '../reducers';
import { State } from '../types';

class AddPlaylist extends React.Component<{ show: boolean; dispatch: Dispatch }> {
  inputRef: any;

  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
  }

  render = () => (
    <div>
      <Modal
        title="Add New Playlist"
        okText="Save"
        visible={this.props.show}
        onOk={this.savePlaylist}
        onCancel={this.cancelSavePlaylist}
      >
        <Input placeholder="PlaylistName" ref={this.inputRef} />
      </Modal>
    </div>
  );

  savePlaylist = () => {
    this.props.dispatch(addPlaylistSaveAction(this.inputRef.current.input.value));
    this.inputRef.current.input.value = '';
  };

  cancelSavePlaylist = () => {
    this.props.dispatch(addPlaylistCancelAction);
    this.inputRef.current.input.value = '';
  };
}

const ConnectedAddPlaylist = connect((state: State) => ({ show: getOpenAddPlaylistWindow(state) }))(AddPlaylist);
export { ConnectedAddPlaylist as AddPlaylist };
