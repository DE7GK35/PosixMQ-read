//var PosixMQ = require('posix-mq');
var PosixMQ = require('./node_modules/posix-mq/lib/index');

/* Create a new queue accessible by all, fill it up, and then close it. */
var mq = new PosixMQ();
mq.open({
    name: '/events',
    create: true,
    mode: '0777',
    maxmsgs: 10,
    msgsize: 8
});
var writebuf = new Buffer(1);
do {
    writebuf[0] = Math.floor(Math.random() * 93) + 33;
    console.log("Writing "+ writebuf[0] +" ('"+ String.fromCharCode(writebuf[0]) +"') to the queue...");
} while (mq.push(writebuf) !== false);
    mq.unlink();
    mq.close();
