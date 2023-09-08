
import React, { Component } from 'react';
import '../../template/style.css';
import NavBar from '../shared/navbar/navBar';
import { Upload, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { setToasterMessage } from './teamAction';
import { changeTriggerState } from '../shared/appStateAction';
import Toaster from '../shared/toaster';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../template/style.css';
import { UploadOutlined } from '@ant-design/icons';
import { getToken } from '../shared/gqlUtils';


const links = [
  {
      title: 'file upload',
      url: '/team_upload',
      cName: 'nav-links'
  },
  {
      title: 'team management',
      url: '/',
      cName: 'nav-links'
  }
];

class FileUploadPage extends Component {
    state = {
        fileList: [],
        uploading: false,
        disabled: true
    }

    static propTypes = {
      match: PropTypes.objectOf(PropTypes.any),
      appState: PropTypes.objectOf(PropTypes.any),
      setToasterMessage: PropTypes.func,
      changeTriggerState: PropTypes.func
    }

    static defaultProps = {
      appState: {},
      setToasterMessage: () => {}
    }

    handleBefore = (file) => {
        const { fileList } = this.state;
        const copy = [...fileList];
        copy.push(file);
        this.setState({ fileList: copy, disabled: false });
        return false;
    }

    handleUpload = async () => {
        const { setToasterMessage, changeTriggerState, match } = this.props;
        const { params } = match;
        const baseUrl = process.env.UPLOAD_URL;
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append('file', fileList[0]);
        const target = params.target;
        const headerReq = new Headers();
        headerReq.append('Authorization', `Bearer ${getToken()}`);

        fetch(`${baseUrl}api/${target}/upload`, {
           method: 'POST',
           body: formData,
           headers: headerReq
        })
        .then(response => response.json())
        .then(data => {
          setToasterMessage({message: `${target} upload was successfully done`, type: 'success'});
          changeTriggerState(true);
          this.setState({ uploading: false, disabled: true });
          setTimeout(() => {
            changeTriggerState(false);
          }, 5000);
        })
        .catch(error => {});
    }


    render() {
        const { fileList, uploading, disabled } = this.state;
        const { appState } = this.props;
        const { triggerNotification, toasterInfo } = appState;
        return (
            <div>
                <NavBar links={links}/>
                { triggerNotification && (<Toaster message={toasterInfo.message} type={toasterInfo.type}/>)}
                <div className='uploadContainer'>
                    <Upload
                      beforeUpload={this.handleBefore}
                      onRemove={() => {}}
                      defaultFileList={fileList}>
                        <Button className='showButton'><UploadOutlined /> Load File</Button>
                    </Upload>
                    <Button
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={disabled}
                        loading={uploading}
                        style={{ marginTop: 16 }}>
                            {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ appState: state.appState });
const mapDispatchToProps = dispatch => bindActionCreators({ changeTriggerState, setToasterMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FileUploadPage);