# Repo Collage

> Arrange GitHub repos by dragging them around.

![http://cl.ly/image/0J39133Z0b1S](http://cl.ly/image/0J39133Z0b1S/content#.png)

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