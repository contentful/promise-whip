/* global describe, it, before */

'use strict';

var Bluebird = require('bluebird');
var buster  = require('buster');
var expect  = buster.referee.expect;
var whip    = require('../index');

buster.spec.expose();

var delayedResolver = function (fun, delay) {
  return function () {
    var resolver = Bluebird.defer();

    setTimeout(function () {
      fun(delay);
      resolver.resolve();
    }, delay);

    return resolver.promise;
  };
};

describe('whip', function () {
  before(function () {
    this.promiseStub = this.stub();
    this.jobs        = [
      delayedResolver(this.promiseStub, 30),
      delayedResolver(this.promiseStub, 10)
    ];
  });

  describe('runSeq', function () {
    before(function (done) {
      whip.runSeq(this.jobs).then(done);
    });

    it('runs the jobs sequentially', function () {
      expect(this.promiseStub.callCount).toEqual(2);
      expect(this.promiseStub.firstCall.args).toEqual([30]);
      expect(this.promiseStub.secondCall.args).toEqual([10]);
    });
  });

  describe('runParallel', function () {
    describe('without parallelism parameter', function () {
      before(function (done) {
        whip.runParallel(this.jobs).then(done);
      });

      it('runs the jobs in parallel', function () {
        expect(this.promiseStub.callCount).toEqual(2);
        expect(this.promiseStub.firstCall.args).toEqual([10]);
        expect(this.promiseStub.secondCall.args).toEqual([30]);
      });
    });

    describe('with parallelism parameter set to 1', function () {
      before(function (done) {
        whip.runParallel(this.jobs, 1).then(done);
      });

      it('runs the jobs sequentially', function () {
        expect(this.promiseStub.callCount).toEqual(2);
        expect(this.promiseStub.firstCall.args).toEqual([30]);
        expect(this.promiseStub.secondCall.args).toEqual([10]);
      });
    });
  });
});
