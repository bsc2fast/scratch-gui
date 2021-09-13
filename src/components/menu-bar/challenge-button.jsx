import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './share-button.css';

import {connect} from 'react-redux';

const ChallengeButton = ({
    className,
    onClick
}) => (
    <Button
        className={classNames(
            className,
            styles.shareButton
        )}
        onClick={onClick}
    >
        <FormattedMessage
            defaultMessage="Submit to Challenge!"
            description="Label for shared project"
            id="gui.menuBar.isSubmit"
        />
    </Button>
);

ChallengeButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

ChallengeButton.defaultProps = {
    className: ''
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChallengeButton);
