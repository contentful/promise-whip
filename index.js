'use strict';

var Bluebird = require('bluebird');

exports.runSeq = runSeq;
function runSeq(jobs) {
  return jobs.reduce(function (job, next) { return job.then(next); }, Bluebird.resolve());
}

exports.runParallel = runParallel;
function runParallel(jobs, parallelism) {
  if (!parallelism) { parallelism = 5; }
  var partitionedJobs = partition(jobs, Math.ceil(jobs.length / parallelism));
  return Bluebird.all(partitionedJobs.map(runSeq));
}

function partition(array, n) {
  if (array.length === 0) return [];
  return [array.slice(0, n)].concat(partition(array.slice(n), n));
}
