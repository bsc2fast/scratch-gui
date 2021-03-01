import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ShareModalComponent from '../components/share-modal/share-modal.jsx';

import {
    closeShareModal
} from '../reducers/modals';

class ShareModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel'

        ]);

    }

    handleCancel () {
        this.props.onClose();
    }
    render () {
        return (
            <ShareModalComponent
                onCancel={this.handleCancel}
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
