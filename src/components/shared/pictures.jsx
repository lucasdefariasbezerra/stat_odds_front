import React, { Component } from 'react';
import { Upload, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import '../../template/style.css';

class Pictures extends Component {
  state = {
    fileList: [],
    uploading: false
  }

  handleBefore = (file) => {
    const { fileList } = this.state;
    const copy = [...fileList];
    copy.push(file);
    this.setState({ fileList: copy });
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

  handleUpload = async () => {
    const { fileList } = this.state;
    this.setState({ uploading: true });
    const list = await this.getBaseList(fileList);
    console.log('list base64 ', list);
  }

  render() {
      const { fileList, uploading } = this.state;
      return(
            <div className='uploadContainer'>
              <Upload
                beforeUpload={this.handleBefore}
                listType='picture'
                defaultFileList={fileList}>
                <Button className='showButton'>
                   <Icon type="upload" /> Load Image
                </Button>
              </Upload>
              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
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