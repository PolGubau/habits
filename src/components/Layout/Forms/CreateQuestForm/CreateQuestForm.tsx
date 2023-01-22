/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import { FaTextHeight } from 'react-icons/fa'
import styles from './CreateQuestForm.module.css'
import { messageCreateCollection } from 'src/utils/text'
import StartButton from 'src/components/Buttons/StartButton/StartButton'
import UserHeader from 'src/components/UserHeader/UserHeader'
import EachQuestionForm from './EachQuestionForm/EachQuestionForm'
import { QuestionInterface } from 'src/interfaces/Question'
import QuestionReaded from './QuestionReaded/QuestionReaded'
import getUserFromLocalStorage from 'src/hooks/getUserFromLocalStorage'
import PATH from 'src/utils/path'
import { useRouter } from 'next/router'
import UserInterface from 'src/interfaces/User'

export default function CreateQuestForm () {
  const router = useRouter()
  const [questions, setQuestions] = useState<QuestionInterface[]>([])

  const {
    con: { status, user }
  } = getUserFromLocalStorage()

  // user will be undefined until status is 1
  if (status !== 1) {
    return <div>Loading...</div>
  }
  const { ID: creatorID } = user as UserInterface

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState(['', '', ''])

  const saveQuestions = (question: QuestionInterface) => {
    if (user) question.creator_id = Number(creatorID)
    question.date_creation = new Date()
    setQuestions([...questions, question])
  }
  const message = messageCreateCollection.base

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // 1. guardar la coleccion en la base de datos
    const collectionData = {
      creator_id: creatorID,
      likes: 0,
      title,
      tags
    }
    // save the post
    const response = await fetch(PATH.API.ALL_COLLECTIONS, {
      method: 'POST',
      body: JSON.stringify(collectionData)
    })

    // get the data
    const data = await response.json()
    // 2. coger el ID de la collection
    const collectionID = data.collection[0].ID
    // 3. guardar las preguntas en la base de datos una por una
    questions.forEach(async (question) => {
      const questionData = {
        ...question,
        collection_id: collectionID
      }
      console.log('SENDED BY FRONT: ', questionData)

      // save the post
      const response = await fetch(PATH.API.QUESTIONS, {
        method: 'POST',
        body: JSON.stringify(questionData)
      })

      // get the data
      const data = await response.json()
      console.log('Result: ', data)
    })

    // 4. redirigir a la pagina de la collection
    router.push(PATH.HOME)
  }
  return (
    <>
      {message && <p className={styles.message}>{message}</p>}

      <form className={styles.formulario}>
        <div className={styles.headerInputs}>
          <div className={styles.inputBig}>
            <div className={styles.inputIcon}>
              <FaTextHeight size={18} />
            </div>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={styles.input}
            />
          </div>
          <UserHeader
            size={49}
            you={true}
            searchById={{
              state: false,
              id: ''
            }}
            name={''}
            image={''}
          />
        </div>
        <section className={styles.tagsContainer}>
          <p>How would you describe your Quest in 3 words?</p>
          <div className={styles.tagsParent}>
            <input
              type="text"
              placeholder="Tag 1"
              onChange={(e) => setTags([e.target.value, tags[1], tags[2]])}
              value={tags[0]}
              className={styles.inputmini}
            />
            <input
              type="text"
              placeholder="Tag 2"
              autoComplete="username"
              onChange={(e) => setTags([tags[0], e.target.value, tags[2]])}
              value={tags[1]}
              className={styles.inputmini}
            />
            <input
              type="text"
              placeholder="Tag 3"
              autoComplete="username"
              onChange={(e) => setTags([tags[0], tags[1], e.target.value])}
              value={tags[2]}
              className={styles.inputmini}
            />
          </div>
        </section>

        {/* */}

        <article className={styles.questionsContainer}>
          <p>Staged Questions</p>
          <section className={styles.questionsDone}>
            {questions.map((question, index) => (
              <QuestionReaded key={index} question={question} />
            ))}
          </section>

          <EachQuestionForm saveQuestion={saveQuestions} />
        </article>

        <div className={styles.buttonContainer} onClick={handleSubmit}>
          <StartButton
            type="submit"
            text="Submit Collection"
            fontSize="1.2rem"
          />
        </div>
      </form>
    </>
  )
}
