/*jshint expr: true*/

var should = require('should'),
    droll  = require('../droll');


describe('droll#parse(formula)', function() {

  it('should return a correctly-formatted object when given a valid formula', function() {
    var result = droll.parse('3d6+1');

    result.should.have.properties(
      'numDice',
      'numSides',
      'modifier',
      'minResult',
      'maxResult',
      'avgResult'
    );

    result.numDice.should.equal(3);
    result.numSides.should.equal(6);
    result.modifier.should.equal(1);
    result.minResult.should.equal(4);
    result.maxResult.should.equal(19);
    result.avgResult.should.equal(7.5);
  });

  it('should return false when given an invalid formula', function() {
    droll.validate('d').should.be.false;
  });

  it('should be case insensitive', function() {
    droll.validate('D4').should.not.be.false;
  });
});


describe('droll#validate(formula)', function() {

  it('should return true when given a valid formula', function() {
    droll.validate('3d6+1').should.be.true;
  });

  it('should return false when given an invalid formula', function() {
    droll.validate('d').should.be.false;
  });
});


describe('droll#roll(formula)', function() {

  it('should return a correctly-formatted object when given a valid formula', function() {
    var result = droll.roll('3d6+1');

    result.should.have.properties('rolls', 'modifier', 'total');

    result.rolls.should.have.length(3);

    result.rolls[0].should.be.within(1, 6);
    result.rolls[1].should.be.within(1, 6);
    result.rolls[2].should.be.within(1, 6);

    result.modifier.should.equal(1);

    result.total.should.be.within(4, 19);
  });

  it('should return false when given an invalid formula', function() {
    droll.roll('d').should.be.false;
  });
});


describe('String representations of DrollResult objects', function() {
  it('should be formatted correctly', function() {
    droll.roll('d8').toString().should.match(/^[1-8]$/);
    droll.roll('2d8').toString().should.match(/^[1-8] \+ [1-8] = \d+$/);
    droll.roll('d8+20').toString().should.match(/^[1-8] \+ 20 = \d+$/);
    droll.roll('2d8+20').toString().should.match(/^[1-8] \+ [1-8] \+ 20 = \d+$/);
    droll.roll('d8-20').toString().should.match(/^[1-8] \- 20 = \-\d+$/);
    droll.roll('2d8-20').toString().should.match(/^[1-8] \+ [1-8] \- 20 = \-\d+$/);
  });
});
