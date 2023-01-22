/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import styles from './LoginForm.module.css'
import { messagesLogin } from 'src/utils/text'

import { useRouter } from 'next/router'
import PATH from 'src/utils/path'
import StartButton from 'src/components/Buttons/StartButton/StartButton'
import InputWithIcon from 'src/components/Buttons/InputButtons/InputWithIcon/InputWithIcon'
import { notificacionTop } from 'src/utils/notifications'
import Swal from 'sweetalert2'
const bcrypt = require('bcryptjs')

export default function LoginForm ({ setLoading }: any) {
  const router = useRouter()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [failedUser, setFailedUser] = useState(false)
  const [failedPassword, setFailedPassword] = useState(false)
  const [message, setMessage] = useState(messagesLogin.base)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch(`/api/users/userName/${userName}`)

    if (!response.ok) {
      // user not found
      void Swal.fire('Ouups!', messagesLogin.userNoExist, 'error')
      setFailedUser(true)
      setMessage(messagesLogin.userNoExist)
      setLoading(false)
    } else {
      // user found
      const user = await response.json()

      const passwordsMatch = await bcrypt.compare(password, user.password)
      // const passwordsMatch = true;
      if (!passwordsMatch) {
        // password not match
        void Swal.fire('Ouups!', messagesLogin.passwordIncorrect, 'error')
        setFailedPassword(true)
        setMessage(messagesLogin.passwordIncorrect)
        setLoading(false)
      } else {
        // password match

        notificacionTop('success', 'Signed in successfully!')

        const jsonUser = JSON.stringify(user)

        localStorage.setItem('user', jsonUser)
        router.push(PATH.HOME).catch((err) => console.log(err))
      }
    }
  }
  return (
    <>
      {Boolean(message) && <p className={styles.message}>{message}</p>}
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <InputWithIcon
          icon="user"
          placeholder="Username"
          value={userName}
          onChange={setUserName}
          failed={failedUser}
        />
        <InputWithIcon
          icon="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          failed={failedPassword}
        />

        <StartButton type="submit" text="Login" fontSize="1.2rem" />
      </form>
    </>
  )
}
