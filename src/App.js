import './App.css';
import { useState } from 'react';
import kizhe from './input/kizhe'
import blotto from './input/blotto'
import strategies from './input/strategies'
import { getRandom, maxMin } from './utils';

function App() {
  const [history, setHistory] = useState([])
  const [strategy, setStrategy] = useState('optimal')

  const play = (step) => {
    let strategyPlayer, strategyEnemy
    if (step === 'random') {
      strategyPlayer = getRandom(1, 4)
    } else if (step === 'optimal') {
      strategyPlayer = maxMin(kizhe).index
    } else {
      strategyPlayer = Number.parseInt(step)
    }

    if (strategy === 'random') {
      strategyEnemy = getRandom(1, 4)
    } else if (strategy === 'optimal') {
      strategyEnemy = maxMin(kizhe).index
    }

    setHistory([...history, {
      pointsK: kizhe[strategyPlayer - 1][strategyEnemy - 1],
      pointsB: blotto[strategyPlayer - 1][strategyEnemy - 1],
      strategyK: strategies[strategyPlayer - 1],
      strategyB: strategies[strategyEnemy - 1]
    }])
  }


  const updateStrategy = (event) => {
    setStrategy(event.target.value);
  }

  const reset = () => {
    setHistory([])
  }

  const score = history.reduce((prev, curr) => {
    return {
      pointsK: prev.pointsK + curr.pointsK,
      pointsB: prev.pointsB + curr.pointsB
    }
  }, { pointsK: 0, pointsB: 0 })
  const lastStep = history?.[history.length - 1]

  return (
    <div className="container">
      <div>
        <div className="rules">
          <p>
            Матриця представлена від вигляду <span className="player">Кіже</span>, противником якого є полковник <span className="enemy">Блотто</span>
          </p>
          Умови задачі:
          <ul>
            <li>У <span className="enemy">Блотто</span> і <span className="player">Кіже</span> по 3 полки</li>
            <li>Всього є 2 фортеці</li>
            <li>За захоплення первої дають 1 бал</li>
            <li>За захоплення другої дають 2 бали</li>
            <li>За знищення полку дають 1 бал</li>
          </ul>
        </div>
        <div className="score">
          {history.reverse().map((item, index) => <div key={`step-${index}`}>
            {index + 1}.&nbsp; (<span className="player">{item.strategyK}</span>/<span className="enemy">{item.strategyB}</span>):&nbsp;
            <span className="player">{item.pointsK}</span> / <span className="enemy">{item.pointsB}</span>
          </div>)}
        </div>
      </div>
      <div>
        <div className="scores">
          <p>Рахунок <span className="player">Кіже(Ви)</span>: {score.pointsK} {lastStep ? <>(+{lastStep?.pointsK})</> : ''}</p>
          <p>Рахунок <span className="enemy">Блотто(Противник)</span>: {score.pointsB} {lastStep ? <>(+{lastStep?.pointsB})</> : ''}</p>
          <p>Вертикальний ряд - стратегії <span className="player">Кіже</span>, горизонтальний - <span className="enemy">Блотто</span>. Позначення X;Y означають, що на перву фотрецю відправляться X полків, на другу - Y</p>
        </div>
        <div>
          <table className='matrix'>
            <tbody>
              <tr>
                <td key='strat-0'></td>
                {strategies.map((str, i) => <td key={`strat-${i + 1}`} className="enemy">{str}</td>)}
              </tr>
              {kizhe.map((el, row) => <tr key={`row-${row}`}>{el.map((val, i) => <>
                {i === 0 && <td key={`matrix-trigger${row}-${i}`} className='player'>
                  <button onClick={() => play(row + 1)}>{strategies[row]}</button>
                </td>}
                <td key={`matrix-${row}-${i}`}>{val}</td>
              </>)}</tr>)}
            </tbody>
          </table>
        </div>
        <div className="controls">
          <div>
            <button onClick={() => play('random')}>Обрати випадково</button>
          </div>
          <div>
            <button onClick={() => play('optimal')}>Обрати оптимально(maxmin)</button>
          </div>
          <div>
            Ходи противника:
            <input checked={strategy === 'random'} type="radio" id="choiceRandom"
              name="random" value="random" onChange={updateStrategy} />
            <label htmlFor="choiceRandom">Випадково</label>

            <input checked={strategy === 'optimal'} type="radio" id='choiceOptimal' name="optimal" value="optimal" onChange={updateStrategy} />
            <label htmlFor="choiceOptimal">Оптимально (maxmin)</label>
          </div>
          <div>
            <button onClick={() => reset()}>Скинути рахунок</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
