import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import styles from './share-modal.css';
import {FormattedMessage} from 'react-intl';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import {connect} from 'react-redux';
import CountryList from '../../containers/country-list.jsx';

const onClick = (onSubmit, uploadProjectCallback) => () => {
    onSubmit(uploadProjectCallback);
};

const ChallengeModal = props => (
    <Modal
        className={styles.modalContentLarge}
        contentLabel={'Submit to Challenge'}
        overlayClassName={styles.modalOverlay}
        id="submitChallenge"
        onRequestClose={props.onCancel}
    >
        <div>
            <Box className={styles.body}>
                <div className={styles.multiItemRow}>
                    <input
                        name="projectName"
                        className={styles.fieldShort}
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        id="projectName"
                        placeholder="Project Name *"
                        spellCheck="false"
                        onChange={props.onChangeTitle}
                        value={props.projectName}
                    />
                </div>

                <div className={styles.multiItemRow}>
                    <textarea
                        name="projectDesc"
                        className={styles.textAreaField}
                        rows={4}
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        id="projectDesc"
                        placeholder="Project Description"
                        spellCheck="false"
                        onChange={props.onChangeTitle}
                        value={props.projectName}
                    />
                </div>

                <div>
                    <div className={styles.multiItemRow}>
                        <input
                            name="authorName"
                            className={styles.fieldShort}
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            id="authorName"
                            placeholder="First Name *"
                            spellCheck="false"
                            onChange={props.onChangeAuthor}
                            value={props.authorName}
                        />
                        <input
                            name="authorName"
                            className={styles.fieldShort}
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            id="authorName"
                            placeholder="Last Name *"
                            spellCheck="false"
                            onChange={props.onChangeAuthor}
                            value={props.authorName}
                        />
                    </div>

                    <div>
                        <div className={styles.multiItemRow}>
                            <input
                                name="email"
                                className={styles.fieldShort}
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                id="email"
                                placeholder="Email *"
                                spellCheck="false"
                                onChange={props.onChangeAuthor}
                                value={props.authorName}
                            />
                            <CountryList className={styles.fieldShort} />
                        </div>
                    </div>
                </div>

                <div className={styles.multiItemRow}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="terms"
                        name="terms"
                    />
                    <label
                        className={styles.terms}
                        htmlFor="terms"
                    >
                        <FormattedMessage
                            defaultMessage="I agree to the "
                            description="Label for share agree"
                            id="gui.shareProject.agree"
                        />
                        <a
                            href="https://ahlab.org"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FormattedMessage
                                defaultMessage="Terms and Conditions"
                                description="Label for share terms"
                                id="gui.shareProject.terms"
                            />
                        </a>
                        <FormattedMessage
                            defaultMessage=" of this challenge"
                            description="Label for share agree2"
                            id="gui.shareProject.agree2"
                        />
                    </label>
                </div>


            </Box>
            <div>
                <SB3Downloader>{(_, downloadProjectCallback, uploadProjectCallback) => (
                    <button
                        className={styles.modalFlushBottomButton}
                        id="projectUpload"
                        type="submit"
                        onClick={onClick(props.onSubmit, uploadProjectCallback)}
                    >
                        <FormattedMessage
                            defaultMessage="Submit!"
                            description="Label for share project"
                            id="gui.shareProject.shareProjectFile"
                        />
                    </button>
                )}</SB3Downloader>
            </div>
        </div>

    </Modal>
);

ChallengeModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onChangeAuthor: PropTypes.func.isRequired,
    projectName: PropTypes.string,
    authorName: PropTypes.string
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChallengeModal);
