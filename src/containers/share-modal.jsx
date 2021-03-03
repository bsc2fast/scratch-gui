import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ShareModalComponent from '../components/share-modal/share-modal.jsx';

import {
    closeShareModal
} from '../reducers/modals';

import GoogleAnalytics from 'react-ga';

class ShareModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleSubmit'

        ]);
    }

    handleCancel () {
        this.props.onClose();
    }

    handleSubmit (uploadProjectCallback) {
        uploadProjectCallback();
        GoogleAnalytics.event({
            category: 'Project',
            action: 'Click',
            label: 'Share Project'
        });
        window.open('https://padlet.com/ychu898/49fsmsyic2yhrfr1', '_blank');
    }

    render () {
        return (
            <ShareModalComponent
                onCancel={this.handleCancel}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

ShareModal.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeShareModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareModal);
