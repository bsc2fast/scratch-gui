import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import styles from './share-modal.css';

const ShareModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={'Share Project'}
        overlayClassName={styles.modalOverlay}
        id="shareModal"
        onRequestClose={props.onCancel}
    >
        <div>
            <Box className={styles.body}>
            </Box>
        </div>

    </Modal>
);

ShareModal.propTypes = {
    onCancel: PropTypes.func.isRequired
};

export default ShareModal;
