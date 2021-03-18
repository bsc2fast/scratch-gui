import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import styles from './share-modal.css';
import {FormattedMessage} from 'react-intl';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import {connect} from 'react-redux';

import {
    openLoadingShare, closeShareModal
} from '../../reducers/modals.js';

const onClick = (onSubmit, uploadProjectCallback, onShareLoading) => () => {
    onSubmit(uploadProjectCallback);
    onShareLoading();
};

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
                        onChange={props.onChangeTitle}
                        value={props.projectName}
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
                        onChange={props.onChangeAuthor}
                        value={props.authorName}
                    />

                </div>

            </Box>
            <div>
                <SB3Downloader>{(_, downloadProjectCallback, uploadProjectCallback) => (
                    <button
                        className={styles.modalFlushBottomButton}
                        id="projectUpload"
                        type="submit"
                        onClick={onClick(props.onSubmit, uploadProjectCallback, props.onShareLoading)}
                    >
                        <FormattedMessage
                            defaultMessage="Share!"
                            description="Label for share project"
                            id="gui.shareProject.shareProjectFile"
                        />
                    </button>
                )}</SB3Downloader>
            </div>
        </div>

    </Modal>
);

ShareModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onChangeAuthor: PropTypes.func.isRequired,
    onShareLoading: PropTypes.func.isRequired,
    projectName: PropTypes.string,
    authorName: PropTypes.string
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onShareLoading: () => {
        dispatch(closeShareModal());
        dispatch(openLoadingShare());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareModal);
