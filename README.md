# Interactive storyline

> Figuring out a proper way to get currentVideo time, and stop the video. While even working with slow internet.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload
npm run dev

# build for production with minification
# (Static folder must be in ROOT of http server.)
npm run build
```

## Flow

```
/*
1. GET currentTime of video in seconds,
2. check if currentSec equals given second,
  if true
    1 .show overlay -> on click overlay video lock = false after 1 sec,
    2. videolock = true
  else
    1. continue playing
    2. videolock = false
*/
```

## File setup

```
ISL
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── favicon.ico
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── data
│   │   │   └── cuePoints.json
│   │   ├── frameseeker.js
│   │   └── styles
│   │       ├── master.styl
│   │       └── partials
│   │           └── video.styl
│   ├── components
│   │   ├── overlay.vue
│   │   └── video.vue
│   ├── eventBus.js
│   ├── main.js
│   └── router
│       └── index.js
└── static
```
