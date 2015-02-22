var expect = require('chai').expect;

console.log('inside testfolder');

describe('test test 2=2', function(){
  it ('runs a dummy test', function(){
    console.log('inside testFolder');
    expect(2).to.equal(2);
  });
});