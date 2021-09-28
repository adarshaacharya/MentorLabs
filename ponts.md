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
app.listen(port, () => console.log(`\x1b[40m`,`\x1b[32m`,
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
`,`\x1b[0m`));
```