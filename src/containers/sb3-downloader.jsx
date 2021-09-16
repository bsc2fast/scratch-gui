import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';

import GoogleAnalytics from 'react-ga';

import {
    closeChallengeModal, closeLoadingShare, openShareModal, openConfirmationModal
} from '../reducers/modals.js';

/**
 * Project saver component passes a downloadProject function to its child.
 * It expects this child to be a function with the signature
 *     function (downloadProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <SB3Downloader>{(downloadProject, props) => (
 *     <MyCoolComponent
 *         onClick={downloadProject}
 *         {...props}
 *     />
 * )}</SB3Downloader>
 */
class SB3Downloader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'downloadProject',
            'uploadProject',
            'uploadChallenge'
        ]);
    }
    downloadProject () {
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            downloadBlob(this.props.projectFilename, content);
        });
    }

    uploadProject (project, author) {
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            console.log('----debug-upload----');
            const formData = new FormData();

            formData.append('project', project);
            formData.append('author', author);
            formData.append('image', content);

            const request = new XMLHttpRequest();
            request.open('POST', 'https://padlet-service-lshnmcrzlq-uc.a.run.app/api');
            request.send(formData);

            request.onload = () => {
                if (request.status === 200) {
                    GoogleAnalytics.event({
                        category: 'Project',
                        action: 'Click',
                        label: 'Share Project'
                    });
                    window.open('https://padlet.com/ychu898/49fsmsyic2yhrfr1', '_blank');
                    this.props.onShareSuccess();
                } else {
                    this.props.onShareFail();
                }
            };

            request.onerror = () => {
                this.props.onShareFail();
            };
        });
    }

    uploadChallenge (project, submission) {
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }

            const formData = new FormData();

            formData.append('project', project);
            formData.append('author', submission);
            formData.append('image', content);

            const request = new XMLHttpRequest();
            request.open('POST', 'https://challenge-service-lshnmcrzlq-uc.a.run.app/api');
            request.send(formData);

            request.onload = () => {
                if (request.status === 200) {
                    this.props.onSubmitSuccess();
                } else {
                    this.props.onChallengeFail();
                }
            };

            request.onerror = () => {
                this.props.onChallengeFail();
            };
        });
    }


    render () {
        const {
            children
        } = this.props;
        return children(
            this.props.className,
            this.downloadProject,
            this.uploadProject,
            this.uploadChallenge
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

SB3Downloader.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    onShareFail: PropTypes.func.isRequired,
    onShareSuccess: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func.isRequired,
    onChallengeFail: PropTypes.func.isRequired,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func
};
SB3Downloader.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});

const mapDispatchToProps = dispatch => ({
    onShareSuccess: () => {
        dispatch(closeLoadingShare());
    },
    onSubmitSuccess: () => {
        dispatch(closeLoadingShare());
        dispatch(openConfirmationModal());
    },
    onShareFail: () => {
        dispatch(closeLoadingShare());
        dispatch(openShareModal());
        alert('Something went wrong, please try again');
    },
    onChallengeFail: () => {
        dispatch(closeLoadingShare());
        dispatch(closeChallengeModal());
        alert('Something went wrong, please try again');
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SB3Downloader);
