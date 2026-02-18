#!/bin/bash
echo "init new build"
npm run build
echo 'remove old build'
rm -rf ../../builds/funcionarios/src/build
echo 'create new build'
cp -rf build/ ../../builds/funcionarios/src/build
echo 'end'