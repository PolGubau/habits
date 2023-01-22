/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import PATH from 'src/utils/path'
import styles from './SignInPannel.module.css'
import ButtonWithIcon from 'src/components/Buttons/ButtonWithIcon/ButtonWithIcon'
import Link from 'next/link'
import useFetch from 'react-fetch-hook'
import { useRouter } from 'next/router'

export default function SignInPannel ({ user }: any) {
  const router = useRouter()
  const { isLoading, data }: { isLoading: boolean, data?: any } = useFetch(
    PATH.API.ALL_COLLECTIONS
  )
  const handleRandomCollection = () => {
    // adding all ids to array
    if (!isLoading) {
      const allCollectios = data.map((collection: any) => collection.ID)
      // choosing random id
      const randomCollectionID =
        allCollectios[Math.floor(Math.random() * allCollectios.length)]
      router.push(`${PATH.QUEST}/${randomCollectionID}`)
    }
  }
  return (
    <>
      <section className={styles.container}>
        <h3 className={styles.title}>Welcome back {user.userName}! </h3>
        <p className={styles.text}></p>
        <div className={styles.buttonGroup}>
          {/* ALL */}

          <Link href={PATH.ALL_QUESTS}>
            <a>
              <ButtonWithIcon text={'All Quests'} icon={'grid'} />
            </a>
          </Link>

          {/* CREATE */}
          <Link href={PATH.CREATE_QUEST}>
            <a>
              <ButtonWithIcon text={'Create One'} icon={'create'} />
            </a>
          </Link>

          {/* RANDOM */}
          <div onClick={handleRandomCollection}>
            <ButtonWithIcon text={'Random Quest'} icon={'dice5'} />
          </div>
        </div>
      </section>
    </>
  )
}
