/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import PATH from 'src/utils/path'
import styles from './SignInPannel.module.css'
import ButtonWithIcon from 'src/components/Buttons/ButtonWithIcon/ButtonWithIcon'
import Link from 'next/link'

export default function SignInPannel () {
  return (
    <>
      <section className={styles.container}>
        <h3 className={styles.title}>Do you have an account?</h3>
        <p className={styles.text}>
          You can use <span>Askaquest</span> without having an account, but you
          can try to <span>Sign in</span> or create an account for a complete
          experience.
        </p>
        <div className={styles.buttonGroup}>
          <Link href={PATH.SIGN_IN}>
            <a>
              <ButtonWithIcon text={'Sign in'} icon={'user'} />
            </a>
          </Link>
          <Link href={PATH.CREATE_ACCOUNT}>
            <a>
              <ButtonWithIcon text={'Create an account'} icon={'create'} />
            </a>
          </Link>
        </div>
      </section>
    </>
  )
}
