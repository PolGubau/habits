import Link from 'next/link'
import React from 'react'
import ButtonWithIcon from 'src/components/Buttons/ButtonWithIcon/ButtonWithIcon'
import PATH from 'src/utils/path'
import styles from './ProfileSignInPannel.module.css'

export default function ProfileSignInPannel ({
  userName = ''
}: {
  userName: string
}) {
  return (
    <>
      <p>Sign In to see the full {userName} profile and follow his/her</p>
      <div className={styles.signInbuttons}>
        <Link href={PATH.SIGN_IN}>
          <a>
            <ButtonWithIcon icon="user" text={'Sign In'} />
          </a>
        </Link>
        <Link href={PATH.CREATE_ACCOUNT}>
          <a>
            <ButtonWithIcon icon="create" text={'Create an Account'} />
          </a>
        </Link>
      </div>
    </>
  )
}
