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
            'handleChangeDesc',
            'handleChangeFirstName',
            'handleChangeEmail',
            'handleChangeCountry',
            'handleTerms',
            'handleCategory'
        ]);

        this.state = {
            projectName: '',
            projectDesc: '',
            firstName: '',
            email: '',
            country: 'default',
            category: 'default',
            terms: false,
            isSubmitDisabled: true
        };
    }

    handleCancel () {
        this.props.onClose();
    }

    handleChangeTitle (event) {
        this.setState({projectName: event.target.value}, () => {
            this.handleNonEmptyFields();
        });
    }

    handleChangeDesc (event) {
        this.setState({projectDesc: event.target.value});
    }

    handleChangeFirstName (event) {
        this.setState({firstName: event.target.value}, () => {
            this.handleNonEmptyFields();
        });
    }

    handleChangeEmail (event) {
        this.setState({email: event.target.value}, () => {
            this.handleNonEmptyFields();
        });
    }

    handleChangeCountry (event) {
        this.setState({country: event.target.value}, () => {
            this.handleNonEmptyFields();
        });
    }

    handleCategory (event) {
        this.setState({category: event.target.value}, () => {
            this.handleNonEmptyFields();
        });
    }

    handleTerms (event) {
        this.setState({terms: event.target.checked}, () => {
            this.handleNonEmptyFields();
        });
    }

    handleSubmit (uploadSubmissionCallback) {
        if (this.state.isSubmitDisabled) return;

        this.props.onShareLoading();
        uploadSubmissionCallback(this.state.projectName.trim(), JSON.stringify(this.state));
    }

    handleNonEmptyFields () {
        this.setState({isSubmitDisabled: this.state.projectName.trim() === '' || this.state.firstName.trim() === '' ||
                this.state.email.trim() === '' || this.state.category.trim() === 'default' ||
                this.state.country.trim() === 'default' || !this.state.terms});
    }

    render () {
        return (
            <ChallengeModalComponent
                projectName={this.state.projectName}
                projectDesc={this.state.projectDesc}
                firstName={this.state.firstName}
                email={this.state.email}
                country={this.state.country}
                category={this.state.category}
                terms={this.state.terms}
                isSubmitDisabled={this.state.isSubmitDisabled}
                onCancel={this.handleCancel}
                onSubmit={this.handleSubmit}
                onChangeTitle={this.handleChangeTitle}
                onChangeDesc={this.handleChangeDesc}
                onChangeFirstName={this.handleChangeFirstName}
                onChangeEmail={this.handleChangeEmail}
                onChangeCountry={this.handleChangeCountry}
                onChangeCategory={this.handleCategory}
                onChangeTerms={this.handleTerms}
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
