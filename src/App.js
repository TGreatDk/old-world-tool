
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Chip } from './components/angleSelector/chip/chip';
// import { Selector } from './components/selector/selector';

function App() {
  const baseSizes = ['25x25', '30x30', '40x40', '50x50', '30x60', '50x75']
  const [baseWidth, setBaseWidth] = useState(25)
  const [width,setWidth] = useState(125);  
  const [baseLength, setBaseLength] = useState(25)
  const [length,setLength] = useState(125);

  const [rankWidth, setRankWidth] = useState(5)
  const [rankDepth, setRankDepth] = useState(5)
  // const [direction, setDirection] = useState('-')
  const [anchor, setAnchor] = useState('0% 0%')
  const [wheelAround, setWheelAround] = useState('Left')
  const [radius, setRadius] = useState(0);
  const [moved, setMoved] = useState(0);
  const [angle, setAngle] = useState(45);

  const calculateMoved = (_angle,_isUpdate,_width,_length) => {
    const loc_radius = Math.sqrt(Math.pow(_width, 2) + Math.pow(_length, 2));
    
    const movedMM = 2 * Math.PI * loc_radius * (_angle / 360)
    const movedInch = _mmToInch(movedMM);
    if(_isUpdate)
    {
    setRadius(loc_radius);
    setMoved(movedInch)
    }

    return Math.round(movedInch*100)/100
  }

  const _mmToInch = (mm) => {
    return mm / 25.4
  }

  const _handleWheelAround = (direction) => {
    setWheelAround(direction);
    switch (direction) {
      case 'Right':
        setAnchor('100% 0%');
        break;
      case 'Left':
        setAnchor('0% 0%');
        break;
      case 'Bottom left':
        setAnchor('0% 100%');
        break;
      case 'Bottom right':
        setAnchor('100% 100%');
        break;
      default:
        break;
    }
  }

  const _handlePrint = () => {    
    window.print();    
  }

  useEffect(() => setWidth(rankWidth*baseWidth),[rankWidth,baseWidth]);
  useEffect(() => setLength(rankDepth*baseLength),[rankDepth,baseLength]);
  useEffect(() => { calculateMoved(angle,true,width,length) }, [rankDepth, rankWidth, angle])

  const baseStyle = {
    margin: '0px',
    width: `${baseWidth}px`,
    height: `${baseLength}px`,
    border: '1px solid #333',
    display: 'inline-block'
  }

  return (
    <div className="App">    
      <header className="App-header">
        Wheel tool
      </header>
      <h3>Base size</h3>
      <select onChange={(event) => {
        const baseSize = event.target.value.split('x');
        setBaseWidth(Number(baseSize[0]))
        setBaseLength(Number(baseSize[1]))
      }}>
        {baseSizes.map(size => <option>{size}</option>)}
      </select>
      <h3>Wheel direction</h3>
      {/* <select onChange={(event) => setDirection(event.target.value === 'Backwards' && wheelAround==='Left'?'':'-')}>
        <option key='-'>Forward</option>
        <option key='+'>Backwards</option>
      </select> */}
      <h3>Wheel around</h3>
      <Chip options={['Left', 'Right']} onChange={_handleWheelAround} />
      {/* <select value={wheelAround} onChange={_handleWheelAround}>
        <option>Left</option>
        <option>Right</option> */}
      {/* <option>Bottom left</option>
        <option>Bottom right</option> */}
      {/* </select> */}
      <h3>Wheel angle</h3>
      {angle}
      <input type='range' min={0} max={360} step={5} onChange={(event) => setAngle(Number(event.target.value))} />
      <h3>Rank width</h3>
      <div>{rankWidth} ({Math.round(_mmToInch(baseWidth * rankWidth) * 100) / 100}")</div>
      <input value={rankWidth} type='range' min={1} max={20} onChange={(event) => setRankWidth(Number(event.target.value))} />
      <h3>Rank depth</h3>
      <div>{rankDepth} ({Math.round(_mmToInch(baseLength * rankDepth) * 100) / 100}")</div>
      <input value={rankDepth} type='range' min={1} max={20} onChange={(event) => setRankDepth(Number(event.target.value))} />
      <h3>You moved: {Math.round((moved*100))/100}" with your {rankWidth * rankDepth} models</h3>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div id='visualized' style={{width:'66%'}}>
          <h5>Visualization only for show - I didn't want to spend too much time here.</h5>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${radius * 3 + 20}px` }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: `${rankWidth * baseWidth + rankWidth}px`
            }}>
              {Array.from(Array(rankDepth * rankWidth)).map((base, index) =>
                <div style={
                  {
                    ...baseStyle,
                    background: `${(wheelAround === 'Left' && index === 0) || (wheelAround === 'Right' && index === rankWidth - 1) ? '#cacaca' : 'inherit'}`,
                    borderTop: rankWidth - 1 < index ? 'none' : '1px solid #333',
                    borderLeft: index % rankWidth ? 'none' : '1px solid #333'
                  }} />)}
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: `${rankWidth * baseWidth + rankWidth}px`,
              rotate: `${wheelAround === 'Left' ? '-' : ''}${angle}deg`,
              transformOrigin: anchor,
              position: 'absolute'
            }}>
              {Array.from(Array(rankDepth * rankWidth)).map((base, index) =>
                <div style={
                  {
                    ...baseStyle,
                    background: `${(wheelAround === 'Left' && index === 0) || (wheelAround === 'Right' && index === rankWidth - 1) ? '#333' : 'inherit'}`,
                    borderTop: rankWidth - 1 < index ? 'none' : '1px solid #333',
                    borderLeft: index % rankWidth ? 'none' : '1px solid #333'
                  }} />)}
            </div>
            <div style={{
              position: 'absolute',
              marginLeft: `-${rankWidth * baseWidth}px`,
              marginTop: `-${rankDepth * baseLength}px`,
              width: `${radius * 2 + rankWidth}px`,
              height: `${radius * 2 + rankDepth}px`,
              border: '1px solid #0000ff',
              borderRadius: '50%'
            }} />
          </div>
        </div>
        <div id='table' style={{width:'34%'}}>
          <table cellPadding='10'>
            <col>
            </col>
            <colgroup span='3'></colgroup>
            <colgroup span='5'></colgroup>
            <tr>
              <thead>
                <th colSpan={1}>Angle</th>
                <th colSpan={rankDepth}>Unit formation moved? <a onClick={_handlePrint}>🖨️</a></th>
              </thead>
              <thead>
                <th colSpan={1}></th>
                {Array.from(Array(rankDepth)).map((ranks,i) => <th>{rankWidth}*{rankDepth-i}</th>)}
                {/* <th>Moved</th> */}
              </thead>
              {[15,30,45,60,75,90].map(_angle => <tr>
                <td>{_angle}</td>
                {/* <td>{calculateMoved(_angle,false,)}</td> */}
                {Array.from(Array(rankDepth)).map((ranks,i) => <td>{calculateMoved(_angle,false,width,(rankDepth-i)*baseLength)}"</td>)}
              </tr>)}              
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
