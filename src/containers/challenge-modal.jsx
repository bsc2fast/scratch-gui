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
            'handleChangeLastName',
            'handleChangeEmail',
            'handleChangeCountry',
            'handleTerms',
            'handleDOB'
        ]);

        this.state = {
            projectName: '',
            projectDesc: '',
            firstName: '',
            lastName: '',
            email: '',
            country: 'default',
            dob: '',
            terms: false,
            isSubmitDisabled: true
        };
    }

    handleCancel () {
        this.props.onClose();
    }

    handleChangeTitle (event) {
        this.setState({projectName: event.target.value});
        this.handleNonEmptyFields();
    }

    handleChangeDesc (event) {
        this.setState({projectDesc: event.target.value});
    }

    handleChangeFirstName (event) {
        this.setState({firstName: event.target.value});
        this.handleNonEmptyFields();
    }

    handleChangeLastName (event) {
        this.setState({lastName: event.target.value});
        this.handleNonEmptyFields();
    }

    handleChangeEmail (event) {
        this.setState({email: event.target.value});
        this.handleNonEmptyFields();
    }

    handleChangeCountry (event) {
        this.setState({country: event.target.value});
        this.handleNonEmptyFields();
    }

    handleDOB (event) {
        this.setState({dob: event.target.value});
        this.handleNonEmptyFields();
    }

    handleTerms (event) {
        this.setState({terms: event.target.checked}, () => {
            this.handleNonEmptyFields();
        });

    }

    handleSubmit (uploadProjectCallback) {
        if (this.state.isSubmitDisabled) return;

        this.props.onShareLoading();
        uploadProjectCallback(this.state.projectName.trim(), `By ${this.state.firstName.trim()}`);
    }

    handleNonEmptyFields () {
        this.setState({isSubmitDisabled: this.state.projectName.trim() === '' || this.state.firstName.trim() === '' ||
                this.state.lastName.trim() === '' || this.state.email.trim() === '' || this.state.dob.trim() === '' ||
                this.state.country.trim() === 'default' || !this.state.terms});
    }

    render () {
        return (
            <ChallengeModalComponent
                projectName={this.state.projectName}
                projectDesc={this.state.projectDesc}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                country={this.state.country}
                dob={this.state.dob}
                terms={this.state.terms}
                isSubmitDisabled={this.state.isSubmitDisabled}
                onCancel={this.handleCancel}
                onSubmit={this.handleSubmit}
                onChangeTitle={this.handleChangeTitle}
                onChangeDesc={this.handleChangeDesc}
                onChangeFirstName={this.handleChangeFirstName}
                onChangeLastName={this.handleChangeLastName}
                onChangeEmail={this.handleChangeEmail}
                onChangeCountry={this.handleChangeCountry}
                onChangeDOB={this.handleDOB}
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
