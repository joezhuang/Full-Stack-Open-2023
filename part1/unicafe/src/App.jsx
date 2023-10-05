import { useState } from "react"


// Example 1...... 

// const Display = ({ counter }) => <p>{counter}</p>

// const Button = ({onClick, text, value}) => {
//   return <button onClick={onClick}>{text} {value && value}</button>
// }

// const AmtIncrease = ({ onChange, addition }) => {
//   const handleChange = (e) => {
//     onChange(e)
//   }
//   return <input onChange={handleChange} value={addition}/>
// } 

// const App = () => {
//   const [counter, setCounter] = useState(0)
//   const [addition, setAddition] = useState(1)
//   const [err, setErr] = useState(false)

//   const changeAddition = (e) => {
//     const value = e.target.value
//     console.log(parseInt(value))
    
//     if (value === '') {
//       setAddition(1);
//       setErr(false)
//     }
//     else if (isNaN(parseInt(value))) setErr(true)
//     else {
//       setErr(false)
//       setAddition(parseInt(value))
//     }
//   }
//   const increase = () => setCounter(value => value + addition)
//   const resetToZero = () => setCounter(0)

//   return (
//     <>
//       <Display counter={counter} />
//       <AmtIncrease onChange={changeAddition} value={addition} />
//       {err && <p>*Number is required</p>}
//       <Button onClick={increase} text='plus' value={addition } />
//       <Button onClick={resetToZero} text='reset'/>
//     </>
//   )
// }

// export default App


// Example 2.......

const Button = ({ handleClick, category }) => { 
  return (
    <button onClick={handleClick}>{category}</button>
  )
}

const Statistics = ({ statistics, feedback }) => {
  return (
    <>
    <Display category='good' counts={feedback.good} />
    <Display category='neutral' counts={feedback.neutral} />
    <Display category='bad' counts={feedback.bad} />
    <Display category='total' counts={statistics.total} />
    <Display category='average' counts={statistics.average} />
    <Display category='positive' counts={statistics.positive} sign='%'/>
    </>
  )
} 

const Display = ({ category, counts, sign }) => <p>{category} {sign ? counts * 100 : counts}{sign && sign }</p>

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const [statistics, setStatistics] = useState({
    total: 0,
    average: 0,
    positive: 0
  })

  const vote = (category) => { 
    const newFeedback = { ...feedback }
    newFeedback[category] = feedback[category] + 1

    const newStatistics = { ...statistics }
    newStatistics['total'] = statistics.total + 1

    const average = () => {
      if (category === 'good') return (statistics.average * statistics.total + 1) / newStatistics['total'] 
      if (category === 'neutral') return (statistics.average * statistics.total) / newStatistics['total'] 
      if (category === 'bad') return (statistics.average * statistics.total - 1) / newStatistics['total'] 
    }
    newStatistics['average'] = average()

    const positive = () => {
      if (category === 'good') return (statistics.positive * statistics.total + 1) / newStatistics['total']
      else return (statistics.positive * statistics.total) / newStatistics['total']
    }
    newStatistics['positive'] = positive()
    return () => { console.log('button ', category, ' is clicked'); setFeedback(newFeedback); setStatistics(newStatistics) }
  }


  return (<div>
    <h1>give feedback</h1>
    <Button handleClick={vote('good')} category='good' />
    <Button handleClick={vote('neutral')} category='neutral' />
    <Button handleClick={vote('bad')} category='bad' />
    <h1>statistics</h1>
    {statistics.total > 0 ? <Statistics statistics={statistics} feedback={feedback} />: <p>No feedback given</p>}

  </div>)
}

export default App
