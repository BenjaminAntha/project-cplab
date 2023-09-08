'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Input } from "@chakra-ui/react"
import { Uploader } from './components/uploadImage'


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Image Recognizer</div>
        <Uploader />
      </div>
    </main>
  )
}
