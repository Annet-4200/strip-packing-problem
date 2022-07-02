// function setup () {
//   let canFit = true;
//   for (let u = 0; u < 10_000; u++) {
//     console.log('width', width)
//     let circlesPosition = [];
//     for (let i = 0; i < circles.length; i++) {
//       const circle = {
//         x: random(circles[i] * 50, width - circles[i] * 50),
//         y: random(circles[i] * 50, height - circles[i] * 50),
//         r: circles[i] * 50
//       };
//
//       let overlapping = false;
//       overlapping = checkOverlapping(circle, circlesPosition);
//
//       if (!overlapping) {
//         circlesPosition.push(circle);
//       } else {
//         let newX, newY;
//         let counter = 0;
//         while (overlapping && counter < 10_000) {
//           circle.x = random(circles[i] * 50, width - circles[i] * 50);
//           circle.y = random(circles[i] * 50, height - circles[i] * 50);
//           overlapping = checkOverlapping(circle, circlesPosition);
//           counter++;
//         }
//         if (!overlapping) {
//           circlesPosition.push(circle);
//         } else {
//           canFit = false;
//           break;
//         }
//       }
//     }
//     if (canFit) {
//       clear();
//       minWidth = width;
//       width = width - 1;
//       createCanvas(width, height);
//       background('#ffb350');
//       for (let k in circlesPosition) {
//         fill(255, 0, 150, 100);
//         noStroke();
//         ellipse(circlesPosition[k].x, circlesPosition[k].y,
//           circlesPosition[k].r * 2, circlesPosition[k].r * 2);
//       }
//     }
//   }
//   console.log('MIN WIDTH WE CAN REACH', minWidth)
// }
const circlesObject = {
  0.527: 1,
  0.564: 2,
  0.592: 3,
  0.747: 4,
  0.760: 5,
  0.807: 6,
  0.845: 7,
  0.853: 8,
  0.855: 9,
  0.868: 10,
  0.887: 11,
  0.955: 12,
  1.044: 13,
  1.085: 14,
  1.180: 15,
  1.237: 16,
  1.274: 17,
  1.275: 18,
  1.281: 19,
  1.292: 20,
  1.374: 21,
  1.399: 22,
  1.404: 23,
  1.484: 24,
  1.491: 25,
  1.493: 26,
  1.551: 27,
  1.670: 28,
  1.739: 29,
  2.050: 30
};

const height = 475;
let width = 1200;
let minWidth;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const checkOverlapping = (circle, circlesPosition) => {
  let overlapping = false;
  for (let j in circlesPosition) {
    const other = circlesPosition[j];
    const d = dist(circle.x, circle.y, other.x, other.y);
    if (d < circle.r + other.r) {
      overlapping = true;
      break;
    }
  }
  return overlapping;
}

const placeCircles = (circles) => {
  var time = performance.now();
  let circlesPosition = [];
  for (let i = 0; i < circles.length; i++) {
    let overlapping = false;
    for (let x = circles[i] * 50; x < width - circles[i] * 50; x++) {
      for (let y = circles[i] * 50; y < height - circles[i] * 50; y++) {
        const circle = { x, y, r: circles[i] * 50, text: circlesObject[circles[i]] };
        overlapping = checkOverlapping(circle, circlesPosition);
        if (!overlapping) {
          circlesPosition.push(circle);
          break;
        }
      }
      if (!overlapping) {
        break;
      }
    }
  }
  // const circlesPosition = [];
  // const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  // const pixels = new Array(width).fill(new Map(zip([...Array(height).keys()], [...Array(height).keys()])));
  // for (let i = 0; i < circles.length; i++) {
  //   let overlapping = false;
  //   for (let index = 0; index < pixels.length; index++) {
  //     for (let [key, value] of pixels[index]) {
  //       if(value > (height - circles[i] * 50)) break;
  //       const circle = {
  //         x: index + circles[i] * 50,
  //         y: value + circles[i] * 50,
  //         r: circles[i] * 50,
  //         text: circlesObject[circles[i]]
  //       };
  //       overlapping = checkOverlapping(circle, circlesPosition);
  //       if (!overlapping) {
  //         for (let x = index; x <= index + circles[i]*50*2; x++) {
  //           for (let y = value; y <= value + circles[i]*50*2; y++) {
  //             if (Math.pow(circles[i]*50, 2) === Math.pow(x-circle.x, 2) + Math.pow(y-circle.y, 2)) {
  //               pixels[index].delete(value);
  //             }
  //           }
  //         }
  //         circlesPosition.push(circle);
  //         break;
  //       }
  //     }
  //     if (!overlapping) {
  //       break;
  //     }
  //   }
  // }
  time = performance.now() - time;
  console.log('Время выполнения = ', time);
  return circlesPosition;
}

const findWidth = (circlesPosition) => {
  let maxX = 0;
  circlesPosition.map(c => {
    if((c.x + c.r) > maxX) {
      maxX = c.x + c.r;
    }
  });
  return maxX;
}

const swap = (circles, left, right) => {
  let temp = circles[left];
  circles[left] = circles[right];
  circles[right] = temp;
  return circles;
}

function setup () {
  let canFit = true;
  const circles = shuffleArray(Object.keys(circlesObject));
  let circlesPosition = placeCircles(circles);
  let found = false;
  while(!found) {
    let minInE = 10_000;
    let minCP = circlesPosition;
    for (let i; i <= 435; i++) {
     //swap
      let newPosition = placeCircles(swap);
      let newWidth = findWidth(newPosition);
      if (newWidth < minInE) {
        minInE = newWidth;
        minCP = newPosition;
      }
    }
    if (minInE < minWidth) {
      minWidth = minInE;
      circlesPosition = minCP;
    }
    else {
      found = true;
    }
  }
  clear();
  createCanvas(width, height);
  background('#ffb350');
  console.log('WIDTH', width.toFixed(2))
  for (let k in circlesPosition) {
    fill(0, 0, 0);
    text(circlesPosition[k].text, circlesPosition[k].x - 5, circlesPosition[k].y + 5)
    fill(random(255), 0, random(255), 100);
    noStroke();
    ellipse(circlesPosition[k].x, circlesPosition[k].y,
      circlesPosition[k].r * 2, circlesPosition[k].r * 2);
  }
}

// Drawing code
function draw () {
}