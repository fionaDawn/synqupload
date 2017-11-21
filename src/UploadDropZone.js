import React, {Component} from 'react';
import './UploadDropZone.css';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-download';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import {blue500, grey400, darkBlack} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';

var apiBaseUrl = "http://localhost:4000/api/";
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
      status: STATUS.UPLOADING,
      filesPreview: [],
      filesToBeSent: [],
      draweropen: false,
      printcount: 5,
      printingmessage: '',
      printButtonDisabled: false,
      acceptedFiles: this.props.acceptedFiles || ['video/*'],
      completed: 0
    }
  }
  /*
  Function:onDrop
  Parameters: acceptedFiles, rejectedFiles
  Usage:This fxn is default event handler of react drop-Dropzone
  which is modified to update filesPreview div
  */
  onDrop(acceptedFiles, rejectedFiles) {
    // console.log('Accepted files: ', acceptedFiles[0].name);
    this.setState({status: STATUS.UPLOADING});
    // var filesToBeSent = this.state.filesToBeSent;
    // if (filesToBeSent.length < this.state.printcount) {
    //   filesToBeSent.push(acceptedFiles);
    //   var filesPreview = [];
    //   for (var i in filesToBeSent) {
    //     filesPreview.push(<div>
    //       {filesToBeSent[i][0].name}
    //       <a href="#">
    //         <FontIcon className="material-icons customstyle" color={blue500} styles={{
    //             top: 10
    //           }} onClick={(event) => this.handleCloseClick(event, i)}>clear</FontIcon>
    //       </a>
    //     </div>)
    //   }
    //   this.setState({filesToBeSent, filesPreview});
    // } else {
    //   alert("You have reached the limit of printing files at a time")
    // }

    // console.log('Rejected files: ', rejectedFiles);
  }

  progress(completed) {
    // if (completed > 100) {
    this.setState({completed: 100});
    // } else {
    //   this.setState({completed});
    //   this.timer = setTimeout(() => this.progress(completed + 10), 1000);
    // }
  }

  renderUploading() {
    this.timer = setTimeout(() => this.progress(5), 1000);
    return (<Dropzone disableClick={true} className={'dropZone'} accept={this.state.acceptedFiles.join(',')} acceptClassName={'stripes'} rejectClassName={'rejectStripes'}>
      <div>
        <Card style={styles.uploadItem}>
          <CardText style={styles.uploadContent}>
            <CircularProgress style={styles.thumbnail} size={40}/>
            <div style={styles.bufferContent}>
              <LinearProgress style={styles.uploadProgress} mode="determinate" value={this.state.completed}/>
              <div>
                <p>
                  Your video is still uploading. Please keep this page open until it's done.
                </p>
                <RaisedButton primary={true} label="Delete" icon={<DeleteIcon/>}/>
              </div>
            </div>

          </CardText>
        </Card>
        <Card style={styles.uploadItem}>
          <CardText style={styles.uploadContent}>
            <CircularProgress style={styles.thumbnail} size={40}/>
            <div style={styles.bufferContent}>
              <LinearProgress style={styles.uploadProgress} mode="determinate" value={this.state.completed}/>
              <div>
                <p>
                  Your video is still uploading. Please keep this page open until it's done.
                </p>
                <RaisedButton primary={true} label="Delete" icon={<DeleteIcon/>}/>
              </div>
            </div>

          </CardText>
        </Card>
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

      // let filesToBeSent = this.state.filesToBeSent;
      // let style = {
      //   addFileBtn: {
      //     'marginTop': '15px'
      //   }
      // };
      //     return (<div className="App">
      //       <div>
      //         <AppBar title="Synq Upload" showMenuIconButton={false}/>
      //       </div>
      //       <div>
      //         <center>
      //           <br/>
      //           <br/>
      //           <div className="row">
      //             {
      //               this.state.filesPreview.length
      //                 ? <span>Preview:</span>
      //                 : ''
      //             }
      //           </div>
      //           <div className="row">
      //             {this.state.printingmessage}
      //           </div>
      //           <RaisedButton disabled={this.state.printButtonDisabled} label="Upload Files" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
      //
      //         </center>
      //       </div>
      //     </div>);
      //   }
    }
  // const style = {
  //   margin: 15
  // };
}
export default UploadDropZone;
