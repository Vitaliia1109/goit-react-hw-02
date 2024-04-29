import { useEffect, useState } from 'react'
import './App.css'
import Description from '../Description/Description'
import Feedback from '../Feedback/Feedback'
import Options from '../Options/Options'
import Notification from '../Notification/Notification'


function App() {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem('feedback')
    if (savedState) {
      return JSON.parse(savedState)
    } 
      return {
        good: 0,
        neutral: 0,
        bad: 0
      }    
  })

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(state))
  }, [state])

  const updateFeedback = (feedbackType) => {
    setState(prevState => {
      return {
       ...prevState,
        [feedbackType]: prevState[feedbackType] + 1
      }
    })
  }
  
  const handleReset = () => {
    setState({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }
  const totalFeedback = state.good + state.neutral + state.bad
  const positiveFeedback = totalFeedback ? Math.round((state.good / totalFeedback) * 100) : 0
  
  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} handleReset={handleReset} totalFeedback={totalFeedback} />
      {totalFeedback ? <Feedback state={state} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback}/> : null}
      {!totalFeedback? <Notification message="No feedback given" /> : null}
    </>
    
  )
 
}

export default App
