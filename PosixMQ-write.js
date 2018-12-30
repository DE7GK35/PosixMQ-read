/*Copyright 2017 Denis Francesconi, Hydro-Quebec
  Copyright 2018 Jonathan Fether, Momentum Data Systems
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
   function PosixMQWriteNode(config) {
      RED.nodes.createNode(this, config);
      var posixmq = new PosixMQ();
      var node = this;

      var cnf = {
         name: config.msgname,
         create: config.create,
         mode: '0777',
         maxmsgs: config.maxmsgs,
         msgsize: config.msgsize
      };
      
      try {
         posixmq.open(cnf);
      }
      catch(err) {
         node.status({ fill: "red", shape: "dot", text: config.msgname });
         return;
      }
      node.status({ fill: "green", shape: "dot", text: config.msgname });

  node.on('input', function(msg) { 
     if(msg.payload)
     {
      posixmq.push(Buffer.from(msg.payload));
     }
  });
   
  node.on('close', function() { 
    posixmq.close();
    node.status({fill: "red", shape: "dot", text: config.msgname});});
 }
 RED.nodes.registerType("posixmq-write", PosixMQWriteNode);
}
