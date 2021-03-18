import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import styles from './sharing-loader.css';
import PropTypes from 'prop-types';

const messages = [
    {
        message: (
            <FormattedMessage
                defaultMessage="Uploading blocks …"
                description="One of the loading messages"
                id="gui.shareLoader.message1"
            />
        )
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Uploading sprites …"
                description="One of the loading messages"
                id="gui.shareLoader.message2"
            />
        )
    },
    {
        message: (
            <FormattedMessage
                defaultMessage="Uploading sounds …"
                description="One of the loading messages"
                id="gui.shareLoader.message3"
            />
        )
    }
];
const mainMessages = {
    'gui.shareLoader.headline': (
        <FormattedMessage
            defaultMessage="Sharing Your Project"
            description="Main loading message"
            id="gui.shareLoader.headline"
        />
    )
};

class SharingLoaderComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            messageNumber: this.chooseRandomMessage()
        };
    }
    componentDidMount () {
        // Start an interval to choose a new message every second
        this.intervalId = setInterval(() => {
            this.setState({messageNumber: this.chooseRandomMessage()});
        }, 1000);
    }
    componentWillUnmount () {
        clearInterval(this.intervalId);
    }
    chooseRandomMessage () {
        return Math.floor(Math.random() * messages.length);
    }
    render () {
        return (
            <div
                className={classNames(styles.background, {
                    [styles.fullscreen]: this.props.isFullScreen
                })}
            >
                <div className={styles.container}>
                    <div className={styles.title}>
                        {mainMessages[this.props.messageId]}
                    </div>
                    <div className={styles.messageContainerOuter}>
                        <div
                            className={styles.messageContainerInner}
                            style={{transform: `translate(0, -${this.state.messageNumber * 25}px)`}}
                        >
                            {messages.map((m, i) => (
                                <div
                                    className={styles.message}
                                    key={i}
                                >
                                    {m.message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SharingLoaderComponent.propTypes = {
    isFullScreen: PropTypes.bool,
    messageId: PropTypes.string
};
SharingLoaderComponent.defaultProps = {
    isFullScreen: false,
    messageId: 'gui.shareLoader.headline'
};

export default SharingLoaderComponent;
