import React, { useState } from 'react'
import SaveButton from 'src/components/Buttons/SaveButton/SaveButton'
import Swal from 'sweetalert2'
import styles from './EachQuestionForm.module.css'

export default function EachQuestionForm ({ saveQuestion }: any) {
  const [answersDone, setAnswersDone] = useState(false)
  const [question, setQuestion] = useState({
    title: '',
    solution: '',
    answers: ['', '', '']
  })
  const changeTitle = (e: { target: { value: string } }) => {
    setQuestion({
      ...question,
      title: e.target.value
    })
  }
  const changeSolution = (e: { target: { value: string } }) => {
    setQuestion({
      ...question,
      solution: e.target.value
    })
  }
  const changeAnswers = (e: any) => {
    // change value of the answer in array
    const answers = question.answers
    answers[e.target.name] = e.target.value
    setQuestion({
      ...question,
      answers
    })

    // if all answers are filled, set answersDone to true
    if (
      question.answers[0] !== '' &&
      question.answers[1] !== '' &&
      question.answers[2] !== ''
    ) {
      setAnswersDone(true)
    }
  }

  const handleSave = () => {
    // save the question if a radio button is pressed
    if (question.solution !== '') {
      saveQuestion(question)
      setQuestion({
        title: '',
        solution: '',
        answers: ['', '', '']
      })
    } else {
      void Swal.fire(
        'Question is not finnished!',
        'You need to check which answer is the solution',
        'warning'
      )
    }
  }
  return (
    <>
      <div className={styles.question}>
        <p className={styles.questionTitle}>Write here your question</p>
        <div className={styles.titleInputs}>
          <input
            type="text"
            placeholder="Question"
            value={question.title}
            className={styles.input}
            onChange={changeTitle}
          />
        </div>
        <div className={styles.answersInputs}>
          <div className={styles.posibleAnswersInputs}>
            <input
              type="text"
              name="0"
              placeholder="Posible Answer"
              value={question.answers[0]}
              className={styles.inputmini}
              onChange={changeAnswers}
            />

            <input
              type="text"
              name="1"
              placeholder="Posible Answer"
              className={styles.inputmini}
              value={question.answers[1]}
              onChange={changeAnswers}
            />
            <input
              type="text"
              name="2"
              placeholder="Posible Answer"
              value={question.answers[2]}
              className={styles.inputmini}
              onChange={changeAnswers}
            />
          </div>
          <section className={styles.questionFooter}>
            <div className={styles.correctOneSection}>
              <div>
                <p className={styles.correctOneText}>
                  Which is the correct one?
                </p>

                <input
                  disabled={!answersDone}
                  type="radio"
                  value={question.answers[0]}
                  id="Answer1radio"
                  onChange={changeSolution}
                  name="AnswerRadio"
                />
                <label htmlFor="Answer1radio">
                  {question.answers[0].length > 1
                    ? question.answers[0]
                    : 'Answer 1'}
                </label>
              </div>
              <div>
                <input
                  disabled={!answersDone}
                  type="radio"
                  value={question.answers[1]}
                  id="Answer2radio"
                  onChange={changeSolution}
                  name="AnswerRadio"
                />

                <label htmlFor="Answer2radio">
                  {question.answers[1].length > 1
                    ? question.answers[1]
                    : 'Answer 2'}
                </label>
              </div>
              <div>
                <input
                  disabled={!answersDone}
                  type="radio"
                  value={question.answers[2]}
                  id="Answer3radio"
                  onChange={changeSolution}
                  name="AnswerRadio"
                />
                <label htmlFor="Answer3radio">
                  {question.answers[2].length > 1
                    ? question.answers[2]
                    : 'Answer 3'}
                </label>
              </div>
            </div>
            <div className={styles.saveButton} onClick={handleSave}>
              <SaveButton />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
