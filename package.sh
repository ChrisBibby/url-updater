#!/bin/bash

# Prepare dist folders
rm -rf ./dist/chrome
mkdir -p ./dist/chrome

# Copy files - Chrome/Edge
cp ./src/background-chrome.js ./dist/chrome/background.js
cp ./src/options.html ./dist/chrome
cp ./src/options.js ./dist/chrome
cp ./src/manifest-chrome.json ./dist/chrome/manifest.json
cp -r ./src/icons/ ./dist/chrome/icons

# Zip
cd ./dist
cd ./chrome && zip -r ../url-updater-chromium.zip .
