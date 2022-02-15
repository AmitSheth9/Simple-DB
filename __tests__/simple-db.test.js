/* eslint-disable no-console */
const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });
  it.skip('takes an object and creates a file and saves it', async() => {
    


  });
  it('gets a file by id and returns deserialized object contents', async () => {
    const db = new SimpleDb(TEST_DIR);
    const testObj = {
      contents: 'file contents'
    };
    await db.save(testObj);
    console.log('testobj', testObj);
    //console.log('testnewFile', newFile);
    //console.log('this', this);
    console.log('id', testObj.id);
    const stringTestObj = JSON.stringify(testObj);
    const newObject = await db.get(stringTestObj.id);
    console.log('testnewObj', newObject);
    expect(newObject).toEqual({ 
      id: expect.any(String),
      contents: 'file contents' });      
  });
  
  

});
