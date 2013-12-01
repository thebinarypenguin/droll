/*jshint expr: true*/

var should        = require('should'),
    child_process = require('child_process');

describe('droll-cli <formula>', function() {

  it('should output to stdout but not to stderr for a valid formula', function() {
    child_process.exec('./bin/droll-cli.js 3d6+1', function(error, stdout, stderr) {
      stdout.should.not.be.empty;
      stderr.should.be.empty;
    });
  });

  it('should output to stderr but not to stdout for an invalid formula', function() {
    child_process.exec('./bin/droll-cli.js 36+1', function(error, stdout, stderr) {
      stdout.should.be.empty;
      stderr.should.not.be.empty;
    });
  });
});