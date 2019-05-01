import React, { Component } from 'react';
import { Upload, Button, Icon, message } from 'antd';
import { request } from 'graphql-request';
import 'antd/dist/antd.css';
import '../../template/style.css';

const mutation = `mutation sendPictureMutation($input: [PictureInput]) {
  sendPicture(input: $input) {
    message
    statusCode
  }
}`;

const endpoint = 'http://localhost:8083/graphql';

class Pictures extends Component {
  state = {
    fileList: [],
    uploading: false,
    disabled: true
  }

  handleBefore = (file) => {
    const { fileList } = this.state;
    const copy = [...fileList];
    copy.push(file);
    this.setState({ fileList: copy, disabled: false });
    return false;
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  getBaseList = (listFile) => {
    const baseList = listFile.map(async (file) => {
      const item = await this.getBase64(file);
      return item;
    });
    // this statement resolve the array of promises
    return Promise.all(baseList);
  }

  mapMutation = (list) => {
    return list.map((item) => {
      return {
        picture: item
      };
    });
  }

  handleRemove = (file) => {
    this.setState((state) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList
      };
    });
  }

  handleUpload = async () => {
    const { fileList } = this.state;
    this.setState({ uploading: true });
    const list = await this.getBaseList(fileList);
    const listInput = this.mapMutation(list);
    const variables = { input: listInput };
    console.log('variables ', variables);
    request(endpoint, mutation, variables)
    .then(data => {
      const { sendPicture } = data;
      const { statusCode } = sendPicture;
      if (statusCode === 200) {
        this.setState({ uploading: false, disabled: true });
        message.success('ok');
      }
      console.log('sendPicture ', sendPicture);
    });
  }

  render() {
      const { fileList, uploading, disabled } = this.state;
      console.log('fileList ', fileList, 'upload ', uploading);
      return(
            <div className='uploadContainer'>
              <Upload
                beforeUpload={this.handleBefore}
                onRemove={this.handleRemove}
                listType='picture'
                defaultFileList={fileList}>
                <Button className='showButton'>
                   <Icon type="upload" /> Load Image
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={disabled}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                  {uploading ? 'Uploading' : 'Start Upload' }
              </Button>
            </div>
        );
    }
}

export default Pictures;