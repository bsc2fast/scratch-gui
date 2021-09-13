import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ChallengeModalComponent from '../components/share-modal/challenge-modal.jsx';

import {
    closeChallengeModal, openLoadingShare
} from '../reducers/modals';

class ChallengeModal extends React.Component {
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
            authorName: '',
            authorNameRequired: false,
            projectNameRequired: false
        };
    }

    handleCancel () {
        this.props.onClose();
    }

    handleChangeTitle (event) {
        this.setState({projectName: event.target.value});
        this.setState({projectNameRequired: false});
    }

    handleChangeAuthor (event) {
        this.setState({authorName: event.target.value});
        this.setState({authorNameRequired: false});
    }

    handleSubmit (uploadProjectCallback) {
        if (this.state.projectName.trim() === '') {
            this.setState({projectNameRequired: true});
        }

        if (this.state.authorName.trim() === '') {
            this.setState({authorNameRequired: true});
        }

        if (this.state.projectName.trim() === '' || this.state.authorName.trim() === '') return;

        this.props.onShareLoading();
        uploadProjectCallback(this.state.projectName.trim(), `By ${this.state.authorName.trim()}`);
    }

    render () {
        return (
            <ChallengeModalComponent
                projectName={this.state.projectName}
                authorName={this.state.authorName}
                projectNameRequired={this.state.projectNameRequired}
                authorNameRequired={this.state.authorNameRequired}
                onCancel={this.handleCancel}
                onSubmit={this.handleSubmit}
                onChangeTitle={this.handleChangeTitle}
                onChangeAuthor={this.handleChangeAuthor}
            />
        );
    }
}

ChallengeModal.propTypes = {
    onClose: PropTypes.func,
    onShareLoading: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeChallengeModal());
    },
    onShareLoading: () => {
        dispatch(closeChallengeModal());
        dispatch(openLoadingShare());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChallengeModal);
