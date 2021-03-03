import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import styles from './share-modal.css';
import {FormattedMessage} from 'react-intl';

const ShareModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={'Share Project'}
        overlayClassName={styles.modalOverlay}
        id="shareProject"
        onRequestClose={props.onCancel}
    >
        <div>
            <Box className={styles.body}>
                <div>
                    <p className={styles.joinFlowInputTitle}>
                        <FormattedMessage
                            defaultMessage="Project Name"
                            description="Label for project name"
                            id="gui.shareProject.projectName"
                        />
                    </p>
                    <input
                        name="projectName"
                        className={styles.field}
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        id="projectName"
                        placeholder="Project Name"
                        spellCheck="false"
                    />
                </div>

                <div>
                    <p className={styles.joinFlowInputTitle}>
                        <FormattedMessage
                            defaultMessage="Author Name"
                            description="Label for author name"
                            id="gui.shareProject.authorName"
                        />
                    </p>
                    <input
                        name="authorName"
                        className={styles.field}
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        id="authorName"
                        placeholder="Author Name"
                        spellCheck="false"
                    />

                </div>

            </Box>
            <div>
                <button
                    className={styles.modalFlushBottomButton}
                    id="projectUpload"
                    type="submit"
                >
                    <FormattedMessage
                        defaultMessage="Share!"
                        description="Label for share project"
                        id="gui.shareProject.shareProjectFile"
                    />
                </button>
            </div>
        </div>

    </Modal>
);

ShareModal.propTypes = {
    onCancel: PropTypes.func.isRequired
};

export default ShareModal;
