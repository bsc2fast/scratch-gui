import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {
    closeConfirmationModal
} from '../reducers/modals';

import ConfirmationModalComponent from '../components/share-modal/confirmation-modal.jsx';

class ConfirmationModal extends React.Component {
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
            <ConfirmationModalComponent
                onCancel={this.handleCancel}
            />
        );
    }
}

ConfirmationModal.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeConfirmationModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmationModal);
