/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  save(obj) {
    obj.id = shortid.generate();
    this.fileName = `${obj.id}.json`;
    this.filePath = path.join(this.dirPath, this.fileName);
    const stringObj = JSON.stringify(obj);
    return fs.writeFile(this.filePath, stringObj);
    
  }
  async get(id) {  
    const fileName = `${id}.json`;
    this.filePath = path.join(this.dirPath, fileName);
    return fs.readFile(this.filePath, 'utf-8')
      .then((result) => { console.log('getresult', result); return JSON.parse(result); })
      .catch((err) => {
        if(err.code === 'ENOENT') {
          return null;
        }
        throw err;
      });
  }
  async getAll() {
    const fileArr = fs.readdir(this.dirPath)
      .then((files) => Promise.all(files.map((file) => this.get(file.split('.')[0]))))
      .catch((err) => { 
        if(err.code === 'ENOENT') {
          throw new Error ('ID Not found'); 
        }
        throw err;
      });
    return fileArr;
  }
  
  
}

module.exports = SimpleDb;
