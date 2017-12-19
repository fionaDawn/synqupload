import React, {Component} from 'react';
import './UploadDropZone.css';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-download';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

import {Card, CardText} from 'material-ui/Card';

// var apiBaseUrl = "http://localhost:4000/api/";
/* Module:superagent
superagent is used to handle post/get requests to server */
// var request = require('superagent');

const STATUS = {
  UPLOAD: 'upload',
  UPLOADING: 'uploading',
  UPLOADED: 'uploaded',
  FAILED: 'failed'
}

const styles = {
  uploadItem: {
    margin: 20
  },
  uploadContent: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  },
  uploadProgress: {
    height: 20,
    paddingBottom: 2,
    justify: 'center'
  },
  thumbnail: {
    backgroundColor: '#C8C8C8',
    padding: '30px 60px',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  deleteIcon: {
    padding: 12,
    color: '#909090'
  },
  bufferContent: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  }
};

class UploadDropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUS.UPLOAD,
      filesToUpload: [],
      maxFiles: 2,
      printingmessage: '',
      acceptedFiles: this.props.acceptedFiles || ['video/*'],
      completed: 0
    }
  }
  /*
  Function:onDrop
  Parameters: acceptedFiles, rejectedFiles
  Usage:This fxn is default event handler of react drop-Dropzone
  */
  onDrop(acceptedFiles, rejectedFiles) {
    var filesToUpload = this.state.filesToUpload;
    if (filesToUpload.length < this.state.maxFiles) {

      this.timer = setTimeout(() => this.progress(5), 1000);
      filesToUpload.push(acceptedFiles);
      this.setState({filesToUpload, status: STATUS.UPLOADING});
    } else {
      alert("You have reached the maximum number of videos allowed to be uploaded.")
    }
  }

  progress(completed) {
    if (completed > 100) {
      clearTimeout(this.timer);
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      this.timer = setTimeout(() => this.progress(completed + 10), 1000);
    }
  }

  renderUploading() {
    var filesToUpload = this.state.filesToUpload;
    return (<Dropzone disableClick={true} onDrop={(files) => this.onDrop(files)} className={'dropZone'} accept={this.state.acceptedFiles.join(',')} acceptClassName={'stripes'} rejectClassName={'rejectStripes'}>
      <div>
        {
          filesToUpload.map((value, idx) => (<Card key='{value[0].name}_{idx}' style={styles.uploadItem}>
            <CardText style={styles.uploadContent}>
              <CircularProgress style={styles.thumbnail} size={40}/>
              <div style={styles.bufferContent}>
                <LinearProgress style={styles.uploadProgress} mode="determinate" value={this.state.completed}/>
                <div>
                  <p>Your video {value[0].name}
                    is still uploading. Please keep this page open until it's done.</p>

                  <RaisedButton primary={true} label="Delete" icon={<DeleteIcon/>}/>
                </div>
              </div>

            </CardText>
          </Card>))
        }
        </div>
    </Dropzone>);
  }

  renderUpload() {
    return (<Dropzone onDrop={(files) => this.onDrop(files)} className={'dropZone'} accept={this.state.acceptedFiles.join(',')} acceptClassName={'stripes'} rejectClassName={'rejectStripes'}>
      <div className={'dropzoneTextStyle'}>
        <p className={'dropzoneParagraph'}>{'Select files to upload'}</p>
        <br/>
        <CloudUploadIcon className={'uploadIconSize'}/>
      </div>
    </Dropzone>);
  }

  render() {
    const {status} = this.state;
    if (status === STATUS.UPLOAD) 
      return this.renderUpload();
    else if (status === STATUS.UPLOADING) 
      return this.renderUploading();
    }
  }
export default UploadDropZone;
