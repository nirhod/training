import { Modal, Input, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { createAddPlaylistSaveActionObject } from '../actions';

class AddPlaylist extends React.Component<{ dispatch: Dispatch }, { showModal: boolean }> {
  inputRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { showModal: false };
  }

  render = () => (
    <div>
      <Button onClick={() => this.setState({ showModal: true })} icon="plus-square" />
      <Modal
        title="Add New Playlist"
        okText="Save"
        visible={this.state.showModal}
        onOk={this.savePlaylist}
        onCancel={this.closeModal}
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
    this.props.dispatch(createAddPlaylistSaveActionObject(inputValue));
    this.closeModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
    this.inputRef.current.input.value = '';
  };
}

const ConnectedAddPlaylist = connect()(AddPlaylist);
export { ConnectedAddPlaylist as AddPlaylist };
