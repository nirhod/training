import { Modal, Input, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addPlaylistSaveAction } from '../actions';

class AddPlaylist extends React.Component<{ dispatch: Dispatch }, { show: boolean }> {
  inputRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { show: false };
  }

  render = () => (
    <div>
      <Button onClick={() => this.setState({ show: true })} icon="plus-square" />
      <Modal
        title="Add New Playlist"
        okText="Save"
        visible={this.state.show}
        onOk={this.savePlaylist}
        onCancel={this.cancelSavePlaylist}
      >
        <Input placeholder="PlaylistName" ref={this.inputRef} />
      </Modal>
    </div>
  );

  savePlaylist = () => {
    const inputValue = this.inputRef.current.input.value;
    if (!inputValue) {
      return;
    }
    this.props.dispatch(addPlaylistSaveAction(inputValue));
    this.cancelSavePlaylist();
  };

  cancelSavePlaylist = () => {
    this.setState({ show: false });
    this.inputRef.current.input.value = '';
  };
}

const ConnectedAddPlaylist = connect()(AddPlaylist);
export { ConnectedAddPlaylist as AddPlaylist };
