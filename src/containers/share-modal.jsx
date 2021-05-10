import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import ShareModalComponent from '../components/share-modal/share-modal.jsx';

import {
    closeShareModal, openLoadingShare
} from '../reducers/modals';

class ShareModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
            'handleSubmit',
            'handleChangeTitle',
            'handleChangeAuthor',
            'handleChangeGroup'
        ]);

        this.state = {
            projectName: '',
            authorName: '',
            groupName: 'default',
            authorNameRequired: false,
            projectNameRequired: false,
            groupNameRequired: false
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

    handleChangeGroup (event) {
        this.setState({groupName: event.target.value});
        this.setState({groupNameRequired: false});
    }

    handleSubmit (uploadProjectCallback) {
        if (this.state.projectName.trim() === '') {
            this.setState({projectNameRequired: true});
        }

        if (this.state.authorName.trim() === '') {
            this.setState({authorNameRequired: true});
        }

        if (this.state.groupName.trim() === 'default') {
            this.setState({groupNameRequired: true});
        }

        if (this.state.projectName.trim() === '' || this.state.authorName.trim() === '' ||
            this.state.groupName.trim() === 'default') return;

        this.props.onShareLoading();
        uploadProjectCallback(this.state.projectName.trim(),
            `By ${this.state.authorName.trim()} - ${this.state.groupName.trim()}`);
    }

    render () {
        return (
            <ShareModalComponent
                projectName={this.state.projectName}
                authorName={this.state.authorName}
                groupName={this.state.groupName}
                projectNameRequired={this.state.projectNameRequired}
                authorNameRequired={this.state.authorNameRequired}
                groupNameRequired={this.state.groupNameRequired}
                onCancel={this.handleCancel}
                onSubmit={this.handleSubmit}
                onChangeTitle={this.handleChangeTitle}
                onChangeAuthor={this.handleChangeAuthor}
                onChangeGroup={this.handleChangeGroup}
            />
        );
    }
}

ShareModal.propTypes = {
    onClose: PropTypes.func,
    onShareLoading: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(closeShareModal());
    },
    onShareLoading: () => {
        dispatch(closeShareModal());
        dispatch(openLoadingShare());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareModal);
