import {assert} from 'chai';
import {metrifyText} from './metrify';

describe('metrify', function() {
  it('converts values', function() {
    assert.equal('450 g', metrifyText('1 lbs'));
    assert.equal('7.6 l', metrifyText('2 gal'));
  });
  it('keeps unknown values', function() {
    assert.equal(undefined, metrifyText('half a cow'));
    assert.equal(undefined, metrifyText('12 stone'));
  });
  it('converts approximate values', function() {
    assert.equal('~ 450 g', metrifyText('~ 1 lbs'));
    assert.equal('~ 150 g', metrifyText('~ 0.32 lbs'));
  });
  it('converts grouped values', function() {
    assert.equal('6 x 350 ml', metrifyText('6 x 12 fl oz'));
  });
});
