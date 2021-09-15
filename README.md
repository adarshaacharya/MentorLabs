# MentorLabs

<p align="center">
<img src="media/logo.png"  alt="logo"/>
</p>

[Track project progess hrere.](https://github.com/adarshaacharya/MentorLabs/projects/1)

```ts
const channels = { ...createProfileInput.channels };
for (const [key, val] of Object.entries(channels)) {
  if (val && val.length > 0) {
    channels[key as keyof Channel] = normalizeUrl(val, { forceHttps: true });
  }
}
```

```
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /home/maxiums/Desktop/MentorLabs/node_modules/normalize-url/index.js
require() of ES modules is not supported.
require() of /home/maxiums/Desktop/MentorLabs/node_modules/normalize-url/index.js from /home/maxiums/Desktop/MentorLabs/server/services/Gravatar.ts is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from /home/maxiums/Desktop/MentorLabs/node_modules/normalize-url/package.json.
```
