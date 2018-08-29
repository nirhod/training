import { Modal } from 'antd';
import { Dispatch } from 'redux';
import { removeSongFromPlaylistAction } from '../actions';

export function showDeleteConfirm(dispatch: Dispatch, songIndex: number) {
  Modal.confirm({
    title: 'Do you want to delete the song from the playlist?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    maskClosable: true,
    onOk: () => {
      dispatch(removeSongFromPlaylistAction(songIndex));
    },
  });
}
