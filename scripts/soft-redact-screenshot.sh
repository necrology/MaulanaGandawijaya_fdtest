#!/usr/bin/env bash
set -euo pipefail

if (( $# < 3 )); then
  echo "Usage: $0 INPUT OUTPUT X:Y:W:H [X:Y:W:H ...]" >&2
  exit 2
fi

redact_input=$1
redact_output=$2
shift 2

mask_filters="format=gray"
for redact_region in "$@"; do
  IFS=: read -r redact_x redact_y redact_width redact_height <<<"$redact_region"
  mask_filters+=",drawbox=x=${redact_x}:y=${redact_y}:w=${redact_width}:h=${redact_height}:color=white:t=fill"
done

redact_tmp="${redact_output}.tmp.png"

ffmpeg -hide_banner -loglevel error -y \
  -i "$redact_input" \
  -filter_complex \
  "[0:v]split=2[base][blur_source];[blur_source]gblur=sigma=22:steps=4[blurred];color=c=black:s=1440x900:d=1,${mask_filters},gblur=sigma=5:steps=2[mask];[blurred][mask]alphamerge[redacted];[base][redacted]overlay=format=auto" \
  -frames:v 1 "$redact_tmp"

mv "$redact_tmp" "$redact_output"
