import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(anecdotes.reduce((acc, currentVal, index) => { acc[index] = 0; return acc }, {}))

  const [most_voted, setMost_voted] = useState(0)

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const getAnecdote = () => {
    const number = getRandomInt(0, anecdotes.length)
    console.log(number)
    setSelected(number)
  }



  const vote = () => { 
    const newPoints = { ...points }
    newPoints[selected] = points[selected] + 1
    setPoints(newPoints)
    const newMost_voted = Object.keys(newPoints).reduce((preVale, curVal, i) =>
    {
      if (newPoints[curVal] > newPoints[preVale]) return curVal;
      return preVale
    }, 0)
    setMost_voted(newMost_voted)
  }

  // .reduce((preVale, curVal, i) => {if (curVal > preVale) return curVal}, 0)

  console.log(points)
//   console.log(Object.keys(points).reduce((preVale, curVal, i) => { if (points[curVal] > points[preVale]) return curVal; return preVale}
// , 0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has { points[selected] } votes</p>
      <Button handleClick={getAnecdote} text={'next anecdote'} />
      <Button handleClick={vote} text={'vote'} />
      <h1>Anecdote with most votes</h1>
      {points[most_voted] > 0 ? <><p>{anecdotes[most_voted]}</p><p>has {points[most_voted]} votes</p></> : <p>No votes yet</p>}
    </div>
  )
}

export default App
