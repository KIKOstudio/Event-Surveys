
import { useEffect, useState } from 'react'
import './App.css'

const QUESTION = 'Are You a Student?'
const OPTIONS = ['YES', 'NO']
const THANK_YOU_DURATION = 600
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbznVpCO7xuBcaQwLhnXJIpbQAsdPl_1sg8iDPvJG-Iy7QbOa61-inxch_H9XDdoDhWn/exec'
export default function App() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!submitted) return

    const timeout = setTimeout(() => {
      setSubmitted(false)
    }, THANK_YOU_DURATION)

    return () => clearTimeout(timeout)
  }, [submitted])

  
async function handleVote(option) {
  if (submitted) return

  setSubmitted(true)

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ answer: option }),
    })
  } catch (error) {
    console.error('Vote submission failed:', error)
  }
}


  return (
    <main className="kiosk">
      <header className="kiosk-header">
        <img
          className="logo-placeholder"
          src="/qumsa.jpg"
          alt="Event logo"
        />
      </header>

      {submitted ? (
        <section className="thank-you" role="status">
          <h1>Thank You!</h1>
        </section>
      ) : (
        <section className="survey">
          <h1 className="question">{QUESTION}</h1>

          <div className="answers">
            {OPTIONS.map((option) => (
              <button
                className="answer-button"
                key={option}
                onClick={() => handleVote(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
