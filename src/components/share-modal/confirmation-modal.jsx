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
                    <p className={styles.challengeTitle}>
                        <FormattedMessage
                            defaultMessage="Thanks for Submitting!"
                            description="Label for confirmation"
                            id="gui.shareProject.projectSubmitted"
                        />
                    </p>
                </div>

                <div>
                    <p className={styles.joinFlowInputTitle}>
                        <FormattedMessage
                            defaultMessage="We have received your project and will let you know the outcome
                            during November 2021."
                            description="Label for confirmation"
                            id="gui.shareProject.confirmationDesc"
                        />

                        <br />
                        <br />

                        <FormattedMessage
                            defaultMessage="Visit our "
                            description="Label for share agree"
                            id="gui.shareProject.confirmation1"
                        />
                        <a
                            className={styles.challengeDescription}
                            href="https://ahlab.org"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FormattedMessage
                                defaultMessage="website"
                                description="Label for challenge website"
                                id="gui.shareProject.website"
                            />
                        </a>
                        <FormattedMessage
                            defaultMessage=" to try out other projects and vote for your favourite!"
                            description="Label for share agree2"
                            id="gui.shareProject.confirmation2"
                        />
                    </p>
                </div>
            </Box>
            <div>
                <button
                    className={styles.modalFlushBottomButton}
                    type="submit"
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Close"
                        description="Label for close modal"
                        id="gui.shareProject.confirmationClose"
                    />
                </button>
            </div>
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
