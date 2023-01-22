/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import router from 'next/router'
import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import StartButton from 'src/components/Buttons/StartButton/StartButton'
import { TopToastMessage } from 'src/components/Messages/TopToastMessage'
import PATH from 'src/utils/path'
import { messageSignUp } from 'src/utils/text'
import Swal from 'sweetalert2'
import styles from './SignUpForm.module.css'

//

export default function SignUpForm () {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const [failedAllFields, setFailedAllFields] = useState(false)

  const [message, setMessage] = useState(messageSignUp.base)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // reset error and message
    setFailedAllFields(false)
    setError('')
    setMessage('')

    // fields check
    if (!userName || !email || !password) {
      setFailedAllFields(true)
      return await Swal.fire(
        'Ouups!',
        messageSignUp.allFieldsAreRequired,
        'error'
      )
    }
    // we need to check if this userName is already taken
    const res = await fetch(`${PATH.API.USER_BY_USERNAME}/${userName}`)
    const userIfIsTaken = await res.json()
    console.log(userIfIsTaken)
    if (!userIfIsTaken.error) {
      return await Swal.fire(
        'Ouups!',
        'This userName is already taken',
        'error'
      )
    }
    // user structure
    const user = {
      userName,
      email,
      password,
      image: `https://api.multiavatar.com/${userName}.svg`
    }
    // save the post
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })

    // get the data
    const data = await response.json()

    if (data.success) {
      setUserName('')
      setEmail('')
      setPassword('')
      void TopToastMessage.fire({
        icon: 'success',
        title: 'Account Created! Now sign in with it'
      })
      void router.push(PATH.SIGN_IN)
    } else {
      // set the error
      return setError(data.message)
    }
  }
  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.inputBig}>
        <div className={styles.inputIcon}>
          <AiOutlineUser size={18} />
        </div>
        <input
          type="text"
          placeholder="Username"
          autoComplete="username"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          className={
            failedAllFields && userName.length === 0
              ? styles.inputError
              : styles.input
          }
        />
      </div>
      <div className={styles.inputBig}>
        <div className={styles.inputIcon}>
          <HiOutlineMail size={18} />
        </div>
        <input
          type="email"
          placeholder="Email"
          autoComplete="current-email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={
            failedAllFields && email.length === 0
              ? styles.inputError
              : styles.input
          }
        />
      </div>
      <div className={styles.inputBig}>
        <div className={styles.inputIcon}>
          <RiLockPasswordLine size={18} />
        </div>
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={
            failedAllFields && password.length === 0
              ? styles.inputError
              : styles.input
          }
        />
      </div>

      <StartButton type="submit" text="Sign Up" fontSize="1.2rem" />
    </form>
  )
}
