'use strict';

var Bluebird = require('bluebird');

var partition = function (array, n) {
  if (array.length === 0) {
    return [];
  }

  return [array.slice(0, n)].concat(partition(array.slice(n), n));
};

module.exports = {
  runSeq: function (jobs) {
    return jobs.reduce(function (job, next) {
      return job.then(next);
    }, Bluebird.resolve());
  },

  runParallel: function (jobs, parallelism) {
    parallelism = parallelism || 5;

    var partitionedJobs = partition(jobs, Math.ceil(jobs.length / parallelism));

    return Bluebird.all(partitionedJobs.map(this.runSeq));
  }
};
