import React from 'react';
import './App.css';

const circles = {
  1: 0.527,
  2: 0.564,
  3: 0.592,
  4: 0.747,
  5: 0.760,
  6: 0.807,
  7: 0.845,
  8: 0.853,
  9: 0.855,
  10: 0.868,
  11: 0.887,
  12: 0.955,
  13: 1.044,
  14: 1.085,
  15: 1.180,
  16: 1.237,
  17: 1.274,
  18: 1.275,
  19: 1.281,
  20: 1.292,
  21: 1.374,
  22: 1.399,
  23: 1.404,
  24: 1.484,
  25: 1.491,
  26: 1.493,
  27: 1.551,
  28: 1.670,
  29: 1.739,
  30: 2.050
};

let minWidth = 0;

const placeCircles = (positions) => {
  for (let i = 0; i < 100; i++) {
    let localMax = 0;
    
    minWidth = Math.min(localMax, minWidth)
  }
  return positions;
};

function App() {
  let positions = new Array(30).fill({top: 0, left: 0});
  //positions = placeCircles(positions);
  console.log('pops', positions)
  return (
    <div className="App">
      <div className="boxWrapper">
        {
          Object.values(circles).reverse().map((circle, index) => {
            return (
              <div
                key={index}
                className='circle'
                style={{
                  top: positions[index].top,
                  left: positions[index].left,
                  width: circle * 100,
                  height: circle * 100
                }}>
                {index + 1}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
