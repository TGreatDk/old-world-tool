
import './App.css';
import { useRef, useState } from 'react';
// import { Selector } from './components/selector/selector';

function App() {
  const baseSizes = ['25x25', '30x30', '40x40', '50x50', '30x60', '50x75']
  const [baseWidth, setBaseWidth] = useState(25)
  const [baseLength, setBaseLenght] = useState(25)

  const [rankWidth, setRankWidth] = useState(5)
  const [rankDepth, setRankDepth] = useState(5)
  const [angle, setAngle] = useState(90);

  const calculateMoved = () => {
    const width = baseWidth * rankWidth;
    const length = baseLength * rankDepth;
    const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(length, 2));
    const movedMM = 2 * Math.PI * radius * (angle / 360)
    const movedInch = movedMM / 25.4
    return movedInch;
  }
  const _anchor = useRef(null);

  return (
    <div className="App">
      <header className="App-header">
        Wheel tool
      </header>
      <h3>Base size</h3>
      <select onChange={(event) => {
        const baseSize = event.target.value.split('x');
        setBaseWidth(Number(baseSize[0]))
        setBaseLenght(Number(baseSize[1]))
      }}>
        {baseSizes.map(size => <option>{size}</option>)}
      </select>
      <h3>Wheel angle</h3>
      {angle}
      <input type='range' min={0} max={345} step={15} onChange={(event) => setAngle(Number(event.target.value))} />
      <h3>Rank width</h3>
      {rankWidth}
      <input value={rankWidth} type='range' min={1} max={20} onChange={(event) => { setRankWidth(Number(event.target.value)) }} />
      <h3>Rank depth</h3>
      {rankDepth}
      <input value={rankDepth} type='range' min={1} max={20} onChange={(event) => setRankDepth(Number(event.target.value))} />                    ''
      <h3>You moved: {calculateMoved()}</h3>
      <div id='anchor' ref={_anchor} />
      {_anchor.current && <div>
        <div style={{ width: `${(rankWidth * baseWidth) + rankWidth * 2}px` }}>
          {Array.from(Array(rankDepth)).map((d, di) =>
            <div style={{ height: `${baseLength + 2}px` }}>
              {Array.from(Array(rankWidth)).map((w, wi) => <span style={{ background: `${!wi && !di ? 'red' : 'inherit'}`, margin: '0px', width: `${baseWidth}px`, height: `${baseLength}px`, border: '1px solid #333', display: 'inline-block' }} />)}
            </div>)
          }
        </div>
        <div style={{ rotate: `${angle}deg` }}>
          {Array.from(Array(rankDepth)).map((d, di) =>
            <div style={{ height: `${baseLength + 2}px` }}>
              {Array.from(Array(rankWidth)).map((w, wi) => <span style={{ background: `${!wi && !di ? 'red' : 'inherit'}`, margin: '0px', width: `${baseWidth}px`, height: `${baseLength}px`, border: '1px solid #f00', display: 'inline-block' }} />)}
            </div>)
          }
        </div>
      </div>}
    </div>
  );
}

export default App;
