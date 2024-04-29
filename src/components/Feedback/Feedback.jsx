import css from './Feedback.module.css'

export default function Feedback({ state: { good, neutral, bad }, totalFeedback }) {
  const positiveFeedback = totalFeedback ? Math.round((good / totalFeedback) * 100) : 0
  return (
    <div className={css.feedbackBlock}>
        <p>Good: { good }</p>
        <p>Neutral: { neutral }</p>
        <p>Bad: { bad }</p>
        <p>Total: { totalFeedback }</p>
        <p>Positive feedback: { positiveFeedback }%</p>
      </div>
  )
}