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
  it('takes an object and creates a file and saves it', async() => {
    const db = new SimpleDb(TEST_DIR);
    const testObj = {
      contents: 'file contents'
    };
    await db.save(testObj);
    const parsedFile = await db.get(testObj.id);
    expect(parsedFile.id).toEqual(testObj.id);


  });
  it('gets a file by id and returns deserialized object contents', async () => {
    const db = new SimpleDb(TEST_DIR);
    const testObj = {
      contents: 'file contents'
    };
    await db.save(testObj);
    const file = await db.get(testObj.id);
    expect(file).toEqual({ 
      id: expect.any(String),
      contents: 'file contents' });      
  });
  it('gets all files in the directory', async() => {
    const newDb = new SimpleDb(TEST_DIR);
    
    const obj1 = {
      stuff: 'some stuff in here',
      data: 'some data'
    };
    const obj2 = {
      stuff: 'different stuff',
      data: 'different data'
    };
    const objArr = [];
    objArr.push(obj1);
    objArr.push(obj2);
    
    await newDb.save(obj1);
    await newDb.save(obj2);
    const fileArr = await newDb.getAll();

    expect(fileArr).toEqual(expect.arrayContaining(objArr));
  });
  
  

});
