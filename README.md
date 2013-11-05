# Repo Collage

> Arrange GitHub repos by dragging them around.

<img src="https://www.dropbox.com/s/rt26etzrje7e9zf/Screenshot%202013-11-04%2022.19.24.png">

This is an experiment. Repos are fetched from GitHub using the public API and displayed as draggable
DOM elements on the screen. Each time an element is dragged, its position is synced with Firebase.

## Dev

```sh
npm install bff -g
cd src
bff server
```

## Build

```sh
cd src
bff ../public
```