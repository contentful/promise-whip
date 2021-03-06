# promise-whip [![Build Status](https://travis-ci.org/contentful/promise-whip.svg?branch=master)](https://travis-ci.org/contentful/promise-whip)

This packages contains some tiny promise helper method. Internally it uses
bluebird..

## The helpers!

### runSeq

Runs jobs in sequential order:

```
whip.runSeq([promise1, promise2]).then(function () {
  // This method will be executed once promise1 and
  // afterwards promise2 has been resolved.
});
```

### runParallel

Runs jobs in parallel:

```
whip.runParallel([promise1, promise2]).then(function () {
  // This method will be executed once promise1 and
  // promise2 has been resolved.
});
```

An additional parameter can be passed which defines how many jobs should
be executed in parallel:

```
// Will behave just like runSeq:
whip.runParallel([promise1, promise2], 1).then(function () {});
```

## Dependencies

- [bluebird](https://github.com/petkaantonov/bluebird)
