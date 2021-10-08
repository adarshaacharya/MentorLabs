/\*\*

- For those not familiar with the Redux Toolkit:
-
- Instead of dealing with reducers, actions, and all as separate files and individually creating all those action types, Redux Toolkit gives us the concept of slices.
- A slice automatically generates reducers, action types, and action creators all in one place. As such, you'll only have to create one folder - slices.
- Notice below, the reducers and actions will share the same name.
  \*/

/\*\*

- Call this instead of a redux action directly in order to submit the form.
- This function will call the redux actions as needed.
- We define this outside of the reducer because it doesn't directly modify state.
- Instead it will asynchronously call reducers as needed.
- A thunk is a function returned by another function.
- It is a style of doing async stuff with redux.
- redux-toolkit inserts redux-thunk middleware by default.
  \*/

- users & profile
  if unidirectional create user field only on profile, so we can query user from profile...
  but there is no way to query from user to profile
  for that we need to create field named profile in User entity and map from both sides

```js
app.listen(port, () =>
  console.log(
    `\x1b[40m`,
    `\x1b[32m`,
    `
     _______  __   __  ___   _______  _______ 
    |       ||  |_|  ||   | |       ||   _   |
    |    ___||       ||   | |    ___||  |_|  |
    |   |___ |       ||   | |   | __ |       |
    |    ___||       ||   | |   ||  ||       |
    |   |___ | ||_|| ||   | |   |_| ||   _   |
    |_______||_|   |_||___| |_______||__| |__|
 
    [+] Maintance      : https://github.com/eminmuhammadi/emiga-stream.git
    [+] Server         : http://localhost:${port}
    [+] Socket         : ws://localhost:${config.Server.settings.port}
    [~] Running Server...
`,
    `\x1b[0m`,
  ),
);
```

**Note :**
https://socket.io/docs/v4/emit-cheatsheet/

- io is a Socket.IO server instance attached to an instance of http.Server listening for incoming events.

- The socket argument of the connection event listener callback function is an object that represents an incoming socket connection from a client.

```js
var connectionEvent = function (socket) {
  console.log('user connected');
  socket.on('message', function (msg) {
    console.log('message: ' + msg);
    io.emit('message', msg);
  });
};

io.on('connection', connectionEvent);
```

## socket notes

**1. Every socket/client in roomId=1 including sender will get the event**

```js
io.to('roomId').emit('some event');
```

**2. Every socket except sender will get the event**

```js
io.on('connection', (socket) => {
  socket.to('roomId').emit('some event'); //
});
```

**3 Each Socket in Socket.IO is identified by a random, unguessable, unique identifier Socket#id. For your convenience, each socket automatically joins a room identified by its own id.**

https://www.youtube.com/watch?v=R1sfHPwEH7A

```tsx
React.useEffect(() => {
  const peer = new Peer({ initiator: true, trickle: false, stream: localStream });

  // call other user
  peer.on('signal', (data: SignalData) => {
    const signalData = { roomId: info.roomId, signal: data };

    socket.emit(SOCKETS_EVENT.SEND_SIGNAL, signalData, ({ error }: SocketCallbackError) => {
      if (error) {
        navigate('/student-labs');
      }
    });
  });

  peer.on('stream', (stream: MediaStream) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
    }
  });

  socket.on(SOCKETS_EVENT.RECEIVE_SIGNAL, (signal: SignalData) => {
    dispatch(setRemoteStream(signal));
    signal && peer.signal(signal);
  });
}, []);
```


https://pastebin.com/uhcAreZn
https://pastebin.com/ru8sVH0N