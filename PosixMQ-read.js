/*Copyright 2017 Denis Francesconi, Hydro-Quebec
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var PosixMQ = require('posix-mq');

module.exports = function (RED) {    

    function PosixMQReadNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
/*    var mq = new PosixMQ();
    mq.open({
     name: '/events',
     create: true,
     mode: '0777',
     maxmsgs: 10,
     msgsize: 8
    });*/

    node.on('input', function(msg)  {
    msg.payload = "queue event is open";
    node.send(msg);
    var n;
/*  readbuf = new Buffer(mq.msgsize);
    while ((n = mq.shift(readbuf)) !== false) {
        msg.payload = readbuf.toString('utf8', 0, n);
        node.send(msg);
    }*/

    });
    mq.unlink();
    mq.close();
    }

    RED.nodes.registerType("PosixMQ-read", PosixMQReadNode);
};
