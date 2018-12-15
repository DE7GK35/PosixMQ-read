Description
===========

This is a fork of Denis Francesconi's [PosixMQ-read](https://github.com/DE7GK35/PosixMQ-read) node for Node-RED.
Uses Mike Okner's [posix-mq](https://github.com/mikeokner/posix-mq) library.

The intent of this expansion is to allow the user to also send to a Message Queue as well as read from it.

This is a work in progress.

Requirements
============

* [node.js](http://nodejs.org/) -- tested against v8+

* [node-red](http://nodered.org/)

* Linux 2.6.6+ or FreeBSD kernel with POSIX message queue support compiled in (`CONFIG_POSIX_MQUEUE`, which is enabled by default)

* See `man mq_overview` for how/where to modify global POSIX message queue resource limits

* Depends on [nan](https://www.npmjs.com/package/nan) & [posix-mq](https://www.npmjs.com/package/posix-mq) which will be automatically installed when running `npm install posixmq-read`.

Values
========

(Pending Edit)

![Values](https://raw.githubusercontent.com/DE7GK35/PosixMQ-read/master/editValues.png)

* **msgname** - _String_ - name of message queue.

* **maxmsgs** - _Number_ - The maximum number of messages in the queue.

* **msgsize** - _Number_ - The maximum size of messages in the queue.
