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
            'handleCancel',
            'handleSubmit',
            'handleChangeTitle',
            'handleChangeAuthor'
        ]);

        this.state = {
            projectName: '',
            authorName: ''
        };
    }

    handleCancel () {
        this.props.onClose();
    }

    handleChangeTitle (event) {
        this.setState({projectName: event.target.value});
    }

    handleChangeAuthor (event) {
        this.setState({authorName: event.target.value});
    }

    handleSubmit (uploadProjectCallback) {
        uploadProjectCallback(this.state.projectName, this.state.authorName);
    }

    render () {
        return (
            <ShareModalComponent
                projectName={this.state.projectName}
                authorName={this.state.authorName}
                onCancel={this.handleCancel}
                onSubmit={this.handleSubmit}
                onChangeTitle={this.handleChangeTitle}
                onChangeAuthor={this.handleChangeAuthor}
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
