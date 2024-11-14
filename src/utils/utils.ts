import { Question, QuizQuestion } from './types.ts'

export const shuffle = (array: any[]) => {
  let currentIndex = array.length

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
}

export const generateQuizQuestion = (
  questions: Question[],
  currentIndex: number,
): QuizQuestion => {
  const questionsCopy = [...questions]
  const choices = []
  let addedRightChoice = false
  for (let i = 0; i < 4; i++) {
    if (!addedRightChoice && (Math.floor(Math.random() * 4) === 1 || i === 3)) {
      choices.push(
        questionsCopy.find((q, i) => {
          if (q.answer === questions[currentIndex].answer) {
            questionsCopy.splice(i, 1)
            return true
          }
        })!.answer,
      )
      addedRightChoice = true
      continue
    }
    const randomIndex = Math.floor(Math.random() * questionsCopy.length)
    choices.push(questionsCopy[randomIndex].answer)
    addedRightChoice =
      addedRightChoice ||
      questionsCopy[randomIndex].answer === questions[currentIndex].answer
    questionsCopy.splice(randomIndex, 1)
  }
  return {
    question: questions[currentIndex].question,
    rightChoice: questions[currentIndex].answer,
    choices,
  }
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
