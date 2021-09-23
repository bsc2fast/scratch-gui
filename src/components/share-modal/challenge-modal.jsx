import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import styles from './share-modal.css';
import {FormattedMessage} from 'react-intl';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import {connect} from 'react-redux';
import CountryList from './country-list.jsx';

const onClick = (onSubmit, uploadSubmissionCallback) => () => {
    onSubmit(uploadSubmissionCallback);
};

const options = [{
    value: 'default',
    text: 'Select Submission Category *',
    disabled: true
}, {
    value: 'Under 10 years',
    text: 'Under 10 years',
    disabled: false
},
{
    value: 'Between 10-12 years',
    text: 'Between 10-12 years',
    disabled: false
}, {
    value: 'Between 13-15 years',
    text: 'Between 13-15 years',
    disabled: false
},
{
    value: 'Open category',
    text: 'Open category',
    disabled: false
}];

const ChallengeModal = props => (
    <Modal
        className={styles.modalContentLarge}
        contentLabel={'Submit to Challenge'}
        overlayClassName={styles.modalOverlay}
        id="submitChallenge"
        onRequestClose={props.onCancel}
    >
        <div className={styles.scrollableContent}>
            <Box className={styles.body}>
                <div>
                    <div className={styles.challengeTitle}>
                        <FormattedMessage
                            defaultMessage="Get Coding and be in to Win!"
                            id="gui.shareProject.challenge"
                        />
                    </div>
                    <br />
                    <div className={styles.challengeDescription}>
                        <a
                            className={styles.challengeDescription}
                            href="https://challenge.kiwrious.com"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noreferrer"
                        >
                            <FormattedMessage
                                defaultMessage="Check out the Challenge"
                                id="gui.shareProject.readMore"
                            />
                        </a>
                    </div>

                </div>

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
                        onChange={props.onChangeDesc}
                        value={props.projectDesc}
                    />
                </div>

                <div>
                    <div className={styles.multiItemRow}>
                        <input
                            name="firstName"
                            className={styles.fieldShort}
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            id="authorName"
                            placeholder="Author Name *"
                            spellCheck="false"
                            onChange={props.onChangeFirstName}
                            value={props.firstName}
                        />
                    </div>

                    <div className={styles.multiItemRow}>
                        <input
                            name="email"
                            className={styles.fieldShort}
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            id="email"
                            placeholder="Parent's Email *"
                            spellCheck="false"
                            onChange={props.onChangeEmail}
                            value={props.email}
                        />
                    </div>

                    <div>
                        <div className={styles.multiItemRow}>
                            <select
                                name="category"
                                id="category"
                                defaultValue={props.category}
                                className={styles.fieldShort}
                                onChange={props.onChangeCategory}
                            >
                                {options.map(opt => (
                                    <option
                                        key={opt.value}
                                        value={opt.value}
                                        disabled={opt.disabled}
                                    >{opt.text}
                                    </option>))}
                            </select>
                            <CountryList
                                className={styles.fieldShort}
                                onChange={props.onChangeCountry}
                                defaultValue={props.country}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.multiItemRow}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={props.terms}
                        onChange={props.onChangeTerms}
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
                            href="https://drive.google.com/file/d/1p47FfsM9dM91UBdUbb_HnWE1VVmaUwQJ/view"
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
                <SB3Downloader>{(_, downloadProjectCallback, uploadProjectCallback, uploadSubmissionCallback) => (
                    <button
                        className={styles.modalFlushBottomButton}
                        disabled={props.isSubmitDisabled}
                        id="projectUpload"
                        type="submit"
                        onClick={onClick(props.onSubmit, uploadSubmissionCallback)}
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
    onChangeDesc: PropTypes.func.isRequired,
    onChangeFirstName: PropTypes.func.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onChangeCountry: PropTypes.func.isRequired,
    onChangeCategory: PropTypes.func.isRequired,
    onChangeTerms: PropTypes.func.isRequired,
    projectName: PropTypes.string,
    projectDesc: PropTypes.string,
    firstName: PropTypes.string,
    email: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    terms: PropTypes.bool,
    isSubmitDisabled: PropTypes.bool
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChallengeModal);
