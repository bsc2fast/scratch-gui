import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import styles from './share-modal.css';
import {FormattedMessage} from 'react-intl';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import {connect} from 'react-redux';

const onClick = (onSubmit, uploadProjectCallback) => () => {
    onSubmit(uploadProjectCallback);
};

const options = [{
    value: 'default',
    text: 'Select your group',
    disabled: true
}, {
    value: 'Group A',
    text: 'Vanilla Scratch First',
    disabled: false
},
{
    value: 'Group B',
    text: 'Vanilla Scratch Second',
    disabled: false
}, {
    value: 'Group C',
    text: 'Kiwrious Scratch First',
    disabled: false
},
{
    value: 'Group D',
    text: 'Kiwrious Scratch Second',
    disabled: false
}];

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
                    <div className={styles.row}>
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
                        {props.projectNameRequired ? (
                            <div className={styles.validationMessage}>
                                <FormattedMessage
                                    defaultMessage="Required"
                                    description="Label for project name required"
                                    id="gui.shareProject.projectRequired"
                                />
                            </div>) : null}
                    </div>
                </div>

                <div>
                    <p className={styles.joinFlowInputTitle}>
                        <FormattedMessage
                            defaultMessage="Author Name"
                            description="Label for author name"
                            id="gui.shareProject.authorName"
                        />
                    </p>
                    <div className={styles.row}>
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
                        {props.authorNameRequired ? (
                            <div className={styles.validationMessage}>
                                <FormattedMessage
                                    defaultMessage="Required"
                                    description="Label for author name required"
                                    id="gui.shareProject.authorRequired"
                                />
                            </div>) : null}
                    </div>

                </div>

                <div>
                    <p className={styles.joinFlowInputTitle}>
                        <FormattedMessage
                            defaultMessage="Group Name"
                            description="Label for group name"
                            id="gui.shareProject.groupName"
                        />
                    </p>
                    <div className={styles.row}>
                        <select
                            name="groupNames"
                            id="groupNames"
                            defaultValue={props.groupName}
                            onChange={props.onChangeGroup}
                            className={styles.field}
                        >
                            {options.map(opt => (
                                <option
                                    key={opt.value}
                                    value={opt.value}
                                    disabled={opt.disabled}
                                >{opt.text}
                                </option>))}
                        </select>
                        {props.groupNameRequired ? (
                            <div className={styles.validationMessage}>
                                <FormattedMessage
                                    defaultMessage="Required"
                                    description="Label for group name required"
                                    id="gui.shareProject.groupRequired"
                                />
                            </div>) : null}
                    </div>
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
    onChangeGroup: PropTypes.func.isRequired,
    projectName: PropTypes.string,
    authorName: PropTypes.string,
    groupName: PropTypes.string,
    authorNameRequired: PropTypes.bool,
    projectNameRequired: PropTypes.bool,
    groupNameRequired: PropTypes.bool
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareModal);
