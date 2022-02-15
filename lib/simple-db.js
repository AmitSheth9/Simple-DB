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
    try{
      const fileName = `${id}.json`;
      this.filePath = path.join(this.dirPath, fileName);
      const file = await fs.readFile(this.filePath, 'utf-8');
      const parsedFile = JSON.parse(file);
      return parsedFile;
    }catch(err) {
      if(err.code === 'ENOENT') throw new Error('ID not found');
      throw err;
    }
  }
  async getAll() {
    try{
      const fileArr = await fs.readdir(this.dirPath);
      console.log(fileArr);
      const newArr = await Promise.all(fileArr.map(async (file) => {
        return this.get(file.split('.')[0]);
      }));
      return newArr;
    }catch(err) {
      if(err.code === 'ENOENT') throw new Error('ID not found');
      throw err;
    }
    
  }
  
  
}

module.exports = SimpleDb;
