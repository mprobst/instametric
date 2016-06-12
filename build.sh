#!/bin/sh

set -x
set -e

tsc
rm instametric.zip || true
zip instametric.zip manifest.json metrify.js
