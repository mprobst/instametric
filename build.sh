#!/bin/sh

set -e
set -x

tsc
rm instametric.zip || true
zip instametric.zip manifest.json metrify.js res/*.png
