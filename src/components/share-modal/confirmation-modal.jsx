import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import styles from './share-modal.css';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

const ConfirmationModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={'Project Submitted'}
        overlayClassName={styles.modalOverlay}
        id="projectSubmitted"
        onRequestClose={props.onCancel}
    >
        <div>
            <Box className={styles.body}>
                <div>
                    <p className={styles.joinFlowInputTitle}>
                        <FormattedMessage
                            defaultMessage="Project Submitted!"
                            description="Label for confirmation"
                            id="gui.shareProject.projectSubmitted"
                        />
                    </p>
                </div>

            </Box>
        </div>

    </Modal>
);

ConfirmationModal.propTypes = {
    onCancel: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmationModal);
