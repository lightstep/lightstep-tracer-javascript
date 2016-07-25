#!/usr/bin/env bash

#-------------------------------------------------------------------------------
# Copies the compiled assets to lightstep.github.io so the assets are easily,
# publicly accessible from a standard location.
#-------------------------------------------------------------------------------
set -e

#
# Clone the docs repo
#
rm -rf temp
mkdir -p temp
pushd temp
git clone git@github.com:lightstep/lightstep.github.io
popd
BASEDIR=temp/lightstep.github.io/dist

#
# Copy the latest LightStep artifacts
#
VERSION=`node -e "p=require('./package.json'); console.log(p.version)"`
OUTDIR=$BASEDIR/lightstep-tracer-javascript/$VERSION
mkdir -p $OUTDIR && cp dist/* $OUTDIR
OUTDIR=$BASEDIR/lightstep-tracer-javascript/current
mkdir -p $OUTDIR && cp dist/* $OUTDIR

#
# Copy the latest OpenTracing artifacts
#
pushd node_modules/opentracing
VERSION=`node -e "p=require('./package.json'); console.log(p.version)"`
popd
OUTDIR=$BASEDIR/opentracing-javascript/$VERSION
mkdir -p $OUTDIR && cp -R node_modules/opentracing/dist/* $OUTDIR
OUTDIR=$BASEDIR/opentracing-javascript/current
mkdir -p $OUTDIR && cp -R node_modules/opentracing/dist/* $OUTDIR

#
# Publish the files via a git push
#
pushd temp/lightstep.github.io
git add .
git commit -m "Update dist files"
git push
popd

rm -rf temp
