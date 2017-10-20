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
  var posixmq = new PosixMQ();
  var node = this;
  var msg;
  var n;
 

  var send = false;
  posixmq.open({ name: '/events',create: true,mode: '0777',maxmsgs: 10, msgsize: 8 });
  node.status({fill: "green", shape: "dot", text: "/events"});
  node.warn("the /events message queue is open");
  readbuf = new Buffer(posixmq.msgsize);
  node.on('input', function() { 
     var str = "";
     while ((n = posixmq.shift(readbuf)) !== false){
      send = true;
      str = str + readbuf.toString('utf8', 0, n);
      };
      if (send){node.send({payload: str})};
      send = false;
  });
  node.on('close', function() { 
    posixmq.unlink();
    posixmq.close();
    node.status({fill: "red", shape: "dot", text: "/events"});});
 }
 RED.nodes.registerType("posixmq-read", PosixMQReadNode);
}
