'use strict';

// var Schedule = require('../../server/boot/script/Schedule')
var moment = require('moment-timezone');
var queue;

module.exports = function (Queue) {
  queue = Queue
  Queue.getAll = allQueues

  Queue.remoteMethod(
    'getAll', {
      http: {
        path: '/getAll',
        verb: 'get',
      },
      returns: {
        arg: 'getAll',
        type: 'array',
      },
    }
  );
};

var getStatus = function(response) {
  var days = ['sun', 'mon', 'tues', 'weds', 'thurs', 'fri', 'sat'];
  var currentTime = moment().tz(process.env.TIME_ZONE);

  var currentDay = days[moment().tz(process.env.TIME_ZONE).format('d')];

  var OPEN_HOUR = moment.tz(response[currentDay + '_open'], 'HH:mm', process.env.TIME_ZONE);
  var CLOSE_HOUR = moment.tz(response[currentDay + '_closed'], 'HH:mm', process.env.TIME_ZONE);

  if (currentTime.isBetween(OPEN_HOUR, CLOSE_HOUR)) {
    if (CLOSE_HOUR.diff(currentTime, 'hours') <= 1) {
      response = 'Closing';
    } else {
      response = 'Open';
    }
  } else {
    response = 'Closed';
  }
  return response
}

function allQueues(cb) {
  queue.find(async function (err, instance) {
    var response = instance;
    let res = [];
    for (let i = 0; i < response.length; i++) {
      let queue = response[i];
      let val = await new Promise(function (resolve, reject) {
        queue.schedule(function (err, tr) {
          queue.status = getStatus(tr)
          resolve({
            queue,
            schedule: tr
          })
        })
      })
      res.push(val)
    }
    cb(null, res);
  });
}
