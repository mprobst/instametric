#!/bin/sh

set -e
set -x

tsc
svg2png -h 128 -w 128 res/icon.svg res/icon128.png
pngcrush -ow res/icon128.png
svg2png -h 48 -w 48 res/icon.svg res/icon48.png
pngcrush -ow res/icon48.png
rm instametric.zip || true
zip instametric.zip manifest.json metrify.js res/*.png
