import { Modal, Input, Button } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { createAddPlaylistSaveActionObject } from '../actions';

class AddPlaylist extends React.Component<{ savePlaylist: (playlistName: string) => {} }, { showModal: boolean }> {
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
        onOk={this.handleOk}
        onCancel={this.closeModal}
      >
        <Input placeholder="PlaylistName" ref={this.inputRef} />
      </Modal>
    </div>
  );

  handleOk = () => {
    const inputValue = this.inputRef.current.input.value;
    if (!inputValue) {
      return;
    }
    this.props.savePlaylist(inputValue);
    this.closeModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
    this.inputRef.current.input.value = '';
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  savePlaylist: (playlistName: string) => {
    dispatch(createAddPlaylistSaveActionObject(playlistName));
  }
});


const ConnectedAddPlaylist = connect(null, mapDispatchToProps)(AddPlaylist);
export { ConnectedAddPlaylist as AddPlaylist };
