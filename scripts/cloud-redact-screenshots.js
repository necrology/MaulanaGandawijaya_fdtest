#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = process.argv[2];
const outputDir = process.argv[3];
const requestedOutputs = new Set(process.argv.slice(4));

if (!inputDir || !outputDir) {
  console.error(
    "Usage: node scripts/cloud-redact-screenshots.js INPUT_DIR OUTPUT_DIR [OUTPUT.png ...]",
  );
  process.exit(2);
}

const box = (x, y, width, height) => ({ x, y, width, height });

function repeatRows(rowTops, columns, rowHeight) {
  return rowTops.flatMap((y, index) => {
    const height = Array.isArray(rowHeight) ? rowHeight[index] : rowHeight;
    return columns.map(([x, width, topInset = 7, bottomInset = 7]) =>
      box(x, y + topInset, width, height - topInset - bottomInset),
    );
  });
}

function textLines(x, width, lines, height = 13) {
  return lines.map((y) => box(x, y, width, height));
}

const jobs = [
  {
    input: "po-dashboard.png",
    output: "pm12-po-dashboard.png",
    regions: [
      ...textLines(126, 134, [84], 25),
      ...textLines(469, 140, [84], 25),
      ...textLines(807, 148, [84], 25),
      ...textLines(1144, 122, [84], 25),
      ...repeatRows(
        [212, 257, 301, 346, 390, 435, 480, 525, 570, 615],
        [
          [126, 98, 4, 8],
          [238, 355, 3, 3],
          [630, 78, 4, 7],
          [1028, 160, 5, 8],
        ],
        45,
      ),
    ],
  },
  {
    input: "po-list.png",
    output: "pm12-po-list.png",
    regions: [
      ...textLines(128, 134, [84], 25),
      ...textLines(469, 138, [84], 25),
      ...textLines(1142, 112, [84], 25),
      ...repeatRows(
        [231, 276, 321, 366, 411, 455, 500, 545, 590, 635],
        [
          [137, 108, 4, 8],
          [260, 386, 3, 3],
          [704, 88, 4, 7],
          [1234, 182, 3, 3],
        ],
        45,
      ),
    ],
  },
  {
    input: "po-log-approval.png",
    output: "pm12-po-log-approval.png",
    regions: [
      ...textLines(126, 134, [84], 25),
      ...textLines(467, 134, [84], 25),
      ...textLines(794, 146, [84], 25),
      ...repeatRows(
        [243, 326, 409, 492, 575, 659, 700, 783, 843],
        [
          [170, 60, 4, 4],
          [242, 300, 4, 4],
          [560, 70, 4, 4],
          [862, 140, 4, 4],
          [1010, 137, 4, 4],
          [1304, 100, 4, 4],
        ],
        [82, 82, 82, 82, 82, 40, 82, 59, 57],
      ),
    ],
  },
  {
    input: "crm-dashboard-overview.png",
    output: "pm13-crm-dashboard.png",
    regions: [
      ...repeatRows(
        [105, 201, 297],
        [
          [220, 105, 7, 7],
          [336, 100, 7, 7],
          [543, 274, 7, 7],
          [829, 86, 7, 7],
        ],
        94,
      ),
      ...repeatRows(
        [568, 618, 666, 714],
        [
          [40, 48, 5, 5],
          [92, 92, 5, 5],
          [187, 54, 5, 5],
          [366, 82, 5, 5],
        ],
        48,
      ),
      ...repeatRows(
        [548, 572, 596, 620, 644, 668, 692, 716],
        [[832, 82, 3, 3]],
        24,
      ),
    ],
  },
  {
    input: "crm-table1.png",
    output: "pm13-crm-table.png",
    regions: [
      ...repeatRows(
        [105, 201, 297],
        [
          [220, 105, 7, 7],
          [336, 100, 7, 7],
          [543, 274, 7, 7],
          [829, 86, 7, 7],
        ],
        94,
      ),
      ...repeatRows(
        [568, 618, 666, 714],
        [
          [40, 48, 5, 5],
          [92, 92, 5, 5],
          [187, 54, 5, 5],
          [366, 82, 5, 5],
        ],
        48,
      ),
      ...repeatRows(
        [548, 572, 596, 620, 644, 668, 692, 716],
        [[832, 82, 3, 3]],
        24,
      ),
    ],
  },
  {
    input: "crm-forecast.png",
    output: "pm13-crm-forecast.png",
    regions: [
      ...repeatRows(
        [725, 821],
        [
          [220, 105, 7, 7],
          [336, 100, 7, 7],
          [543, 274, 7, 7],
          [829, 86, 7, 7],
        ],
        94,
      ),
    ],
  },
  {
    input: "crm-top-outlet.png",
    output: "pm13-crm-top-outlet.png",
    regions: [
      ...repeatRows(
        [135, 181, 227, 273],
        [
          [40, 48, 4, 4],
          [92, 92, 4, 4],
          [187, 54, 4, 4],
          [366, 82, 4, 4],
        ],
        46,
      ),
      ...repeatRows(
        [454, 516, 579, 641, 704],
        [
          [79, 102, 5, 5],
          [190, 92, 5, 5],
          [293, 66, 5, 5],
          [374, 150, 5, 5],
          [538, 276, 5, 5],
          [980, 75, 5, 5],
          [1058, 88, 5, 5],
          [1155, 52, 5, 5],
        ],
        62,
      ),
    ],
  },
  {
    input: "lnd-dashboard.png",
    output: "pm14-lnd-dashboard.png",
    regions: [
      ...repeatRows(
        [122, 210, 284],
        [
          [24, 103, 4, 4],
          [139, 83, 4, 4],
          [234, 217, 4, 4],
          [466, 158, 4, 4],
          [704, 132, 4, 4],
        ],
        [87, 73, 87],
      ),
    ],
  },
  {
    input: "posevt-dashboard.png",
    output: "pm15-posevt-dashboard.png",
    regions: [
      box(100, 14, 450, 28),
      box(104, 100, 310, 59),
      ...textLines(123, 275, [195, 227, 259, 291, 323, 355], 21),
      ...textLines(685, 61, [195, 227, 259, 291, 323, 355], 21),
      ...textLines(1270, 137, [90, 121, 151, 181, 211], 27),
      ...textLines(136, 187, [489, 576, 610, 644, 678], 22),
      ...textLines(347, 64, [489, 576, 610, 644, 678], 22),
      ...textLines(425, 63, [489, 576, 610, 644, 678], 22),
      ...textLines(500, 78, [489, 576, 610, 644, 678], 22),
      ...textLines(590, 77, [489, 576, 610, 644, 678], 22),
      ...textLines(678, 68, [489, 576, 610, 644, 678], 22),
      ...textLines(754, 176, [438, 472, 505, 539, 576, 610, 644, 678], 22),
      ...textLines(938, 82, [438, 472, 505, 539, 576, 610, 644, 678], 22),
      ...textLines(1033, 70, [438, 472, 505, 539, 576, 610, 644, 678], 22),
      ...textLines(1109, 112, [438, 472, 505, 539, 576, 610, 644, 678], 22),
      ...textLines(1239, 166, [489, 576, 610, 644, 678], 22),
    ],
  },
];

async function makeCloudRegion(inputPath, region, imageWidth, imageHeight) {
  const feather = 5;
  const padding = feather + 2;
  const left = Math.max(0, Math.floor(region.x - padding));
  const top = Math.max(0, Math.floor(region.y - padding));
  const right = Math.min(imageWidth, Math.ceil(region.x + region.width + padding));
  const bottom = Math.min(imageHeight, Math.ceil(region.y + region.height + padding));
  const width = right - left;
  const height = bottom - top;
  const smallWidth = 1;
  const smallHeight = 1;

  const blurred = await sharp(inputPath)
    .extract({ left, top, width, height })
    .resize(smallWidth, smallHeight, { kernel: sharp.kernel.lanczos3 })
    .resize(width, height, { kernel: sharp.kernel.nearest })
    .blur(8)
    .ensureAlpha()
    .png()
    .toBuffer();

  const inset = padding;
  const maskSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">` +
      `<rect x="${inset}" y="${inset}" width="${Math.max(1, width - inset * 2)}" ` +
      `height="${Math.max(1, height - inset * 2)}" rx="7" fill="white"/>` +
      `</svg>`,
  );
  const featheredMask = await sharp(maskSvg).blur(feather).png().toBuffer();
  const mask = await sharp(featheredMask)
    .composite([{ input: maskSvg, blend: "over" }])
    .png()
    .toBuffer();
  const cloud = await sharp(blurred)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  return { input: cloud, left, top };
}

async function processJob(job) {
  const inputPath = path.join(inputDir, job.input);
  const outputPath = path.join(outputDir, job.output);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Missing input: ${inputPath}`);
  }

  const metadata = await sharp(inputPath).metadata();
  if (metadata.width !== 1440 || metadata.height !== 900) {
    throw new Error(`${job.input} must be 1440x900, got ${metadata.width}x${metadata.height}`);
  }

  const composites = [];
  for (const region of job.regions) {
    composites.push(await makeCloudRegion(inputPath, region, metadata.width, metadata.height));
  }

  await sharp(inputPath).composite(composites).png().toFile(outputPath);
  console.log(`${job.output}: ${job.regions.length} cloud regions`);
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const selectedJobs = requestedOutputs.size
    ? jobs.filter((job) => requestedOutputs.has(job.output))
    : jobs;
  if (selectedJobs.length === 0) {
    throw new Error("No matching output names were requested");
  }
  for (const job of selectedJobs) {
    await processJob(job);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
