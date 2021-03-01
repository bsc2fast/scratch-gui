import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './share-button.css';

import GoogleAnalytics from 'react-ga';

import SB3Downloader from '../../containers/sb3-downloader.jsx';
import {connect} from 'react-redux';

import {
    openShareModal
} from '../../reducers/modals.js';

const onClick = (uploadProjectCallback, onOpenShareProject) => () => {
    uploadProjectCallback();
    GoogleAnalytics.event({
        category: 'Project',
        action: 'Click',
        label: 'Share Project'
    });
    window.open('https://padlet.com/ychu898/49fsmsyic2yhrfr1', '_blank');
    onOpenShareProject();
};

const ShareButton = ({
    isShared,
    className,
    onOpenShareProject
}) => (
    <SB3Downloader>{(_, downloadProjectCallback, uploadProjectCallback) => (
        <Button
            className={classNames(
                className,
                styles.shareButton,
                {[styles.shareButtonIsShared]: isShared}
            )}
            onClick={onClick(uploadProjectCallback, onOpenShareProject)}
        >
            {isShared ? (
                <FormattedMessage
                    defaultMessage="Shared"
                    description="Label for shared project"
                    id="gui.menuBar.isShared"
                />
            ) : (
                <FormattedMessage
                    defaultMessage="Share"
                    description="Label for project share button"
                    id="gui.menuBar.share"
                />
            )}
        </Button>
    )}</SB3Downloader>
);

ShareButton.propTypes = {
    className: PropTypes.string,
    isShared: PropTypes.bool,
    onOpenShareProject: PropTypes.func.isRequired
};

ShareButton.defaultProps = {
    className: ''
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onOpenShareProject: () => {
        dispatch(openShareModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareButton);
