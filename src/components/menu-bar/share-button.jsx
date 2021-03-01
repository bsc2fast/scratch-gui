import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './share-button.css';

import GoogleAnalytics from 'react-ga';

import SB3Downloader from '../../containers/sb3-downloader.jsx';

const onClick = uploadProjectCallback => () => {
    uploadProjectCallback();
    GoogleAnalytics.event({
        category: 'Project',
        action: 'Click',
        label: 'Share Project'
    });
    window.open('https://padlet.com/ychu898/49fsmsyic2yhrfr1', '_blank');
}

const ShareButton = ({
    isShared,
    className
}) => (
    <SB3Downloader>{(_, downloadProjectCallback, uploadProjectCallback) => (
        <Button
            className={classNames(
                className,
                styles.shareButton,
                {[styles.shareButtonIsShared]: isShared}
            )}
            onClick={onClick(uploadProjectCallback)}
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
    isShared: PropTypes.bool
};

ShareButton.defaultProps = {
    className: ''
};

export default ShareButton;
