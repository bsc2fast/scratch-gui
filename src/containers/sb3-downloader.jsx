import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';

import GoogleAnalytics from 'react-ga';
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
            'uploadProject'
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
            request.open('POST', 'http://146.148.32.205:8000/api');
            request.send(formData);

            request.onload = () => {
                if (request.status === 200) {
                    GoogleAnalytics.event({
                        category: 'Project',
                        action: 'Click',
                        label: 'Share Project'
                    });
                    console.log('Shared');
                    window.open('https://padlet.com/ychu898/49fsmsyic2yhrfr1', '_blank');
                } else {
                    console.log('Request Failed');
                }
            };

            request.onerror = () => {
                console.log('Request Failed');
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
            this.uploadProject
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

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SB3Downloader);
