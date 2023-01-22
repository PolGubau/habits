import React from 'react'
import styles from './Intro.module.css'
export default function Intro ({ children }: any) {
  return <section className={styles.introContainer}>{ children }</section>
}
