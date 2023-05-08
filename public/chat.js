let options = {
  port: 8000,
  hostname: 'localhost'
};

// Initiate the connection to the server
let socket = socketClusterClient.create(options);

(async () => {
  for await (let { error } of socket.listener('error')) {
    console.error(error);
  }
})();

(async () => {
  for await (let event of socket.listener('connect')) {
    console.log('Socket is connected');
  }
})();
(async () => {
  let channel = socket.subscribe('sample');
  for await (let data of channel) {
    // ... Handle channel data.
    document.getElementById('channel-data').value += data + "\n";
  }
})();
function publishToChannel() {
  socket.transmitPublish('sample', document.getElementById('channel-input').value);
}
