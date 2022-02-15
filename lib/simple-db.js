/* eslint-disable no-console */
const { writeFile, readFile, readdir } = require('fs');
const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  save(obj) {
    //stringify object
    //add shortid
    //create file with id as name
    
    obj.id = shortid.generate();
    this.fileName = `${obj.id}.json`;
    console.log('filename', this.fileName);
    this.filePath = path.join(this.dirPath, this.fileName);
    console.log('filePath', this.filePath);
    const stringObj = JSON.stringify(obj);
    return fs.writeFile(this.filePath, stringObj);
    
  }
  get(id) {
    //find file by id
    //search rootDir, id.json()
    
    const fileName = `${id}.json`;
    this.filePath = path.join(this.dirPath, fileName);
    return fs.readFile(this.filePath, 'utf8')
      .then((result) => JSON.parse(result))
      .catch((err) => {
        if(err.code === 'ENOENT') {
          throw new Error('file not found');
        }
        throw err;
      });
  }
  
  
}

module.exports = SimpleDb;
