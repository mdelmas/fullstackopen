import { useState } from 'react'

const Title = ({ text }) => (<h1>{text}</h1>)

const StatisticLine = ({ label, number }) => (
  <tr>
    <td>{label}</td>
    <td>{number}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (!total) return (<p>No feedback given</p>)

  return ( 
    <table>
      <tbody>
        <StatisticLine label="good" number={good} />
        <StatisticLine label="neutral" number={neutral} />
        <StatisticLine label="bad" number={bad} />
        <StatisticLine label="all" number={total} />
        <StatisticLine label="average" number={(good - bad) / total} />
        <StatisticLine label="positive" number={good * 100 / total + ' %'} />
      </tbody>
    </table> 
  )
}

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Title text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />

      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App