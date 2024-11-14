import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { generateQuizQuestion, shuffle, sleep } from '../../utils/utils.ts'
import { Question, QuizQuestion } from '../../utils/types.ts'
import classes from './gameMenu.module.sass'
import { useNavigate } from 'react-router'

export const GameMenu = () => {
  const [searchParams] = useSearchParams()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>()
  const [answered, setAnswered] = useState<boolean>(false)
  const [rightAnswerCount, setRightAnswerCount] = useState<number>(0)
  const [finished, setFinished] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/history.json').then((r) =>
      r.json().then((d) => {
        const newQuestions: Question[] = []
        if (searchParams.get('dates') == 'true')
          d.dates.forEach((d: string[]) =>
            newQuestions.push({ question: d[0], answer: d[1] }),
          )
        if (searchParams.get('terms') == 'true')
          d.terms.forEach((t: string[]) =>
            newQuestions.push({ question: t[0], answer: t[1] }),
          )
        shuffle(newQuestions)
        const count = searchParams.get('count')
          ? +searchParams.get('count')!
          : 0
        setQuestions(
          newQuestions.slice(0, count !== 0 ? count : newQuestions.length),
        )
      }),
    )
  }, [searchParams])

  useEffect(() => {
    if (questions.length <= 0) return
    setCurrentQuestion(generateQuizQuestion(questions, currentQuestionIndex))
  }, [currentQuestionIndex, questions])

  const answerQuestion = async (value: string) => {
    if (value === questions[currentQuestionIndex].answer)
      setRightAnswerCount((val) => ++val)
    setAnswered(true)
    await sleep(1000)
    setAnswered(false)
    if (currentQuestionIndex < questions.length - 1)
      setCurrentQuestionIndex((i) => i + 1)
    else setFinished(true)
  }

  if (questions.length <= 0 || !currentQuestion) return null

  return !finished ? (
    <div className={classes.menu}>
      <h1>{questions[currentQuestionIndex].question}</h1>
      <ul>
        {currentQuestion.choices.map((c) => (
          <li key={c}>
            <button
              disabled={answered}
              className={(
                answered &&
                (c !== currentQuestion.rightChoice
                  ? classes.wrong
                  : classes.right)
              ).toString()}
              onClick={() => answerQuestion(c)}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={classes.result}>
      <h1>{`${rightAnswerCount}/${questions.length}`}</h1>
      <svg
        width="250"
        height="250"
        viewBox="0 0 250 250"
        className={classes.circularProgress}
        style={{
          //@ts-ignore
          '--progress': Math.round((rightAnswerCount / questions.length) * 100),
        }}
      >
        <circle className={classes.bg}></circle>
        <circle className={classes.fg}></circle>
      </svg>
      <div>
        <button onClick={() => navigate(0)}>Заново</button>
        <button onClick={() => navigate('/')}>Вернуться домой</button>
      </div>
    </div>
  )
}
