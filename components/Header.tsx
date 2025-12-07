"use client";

import Link from 'next/link'
import styles from './Header.module.css'

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}><Link href="/">Nalanda</Link></div>
        <nav className={styles.nav}>
          <Link href="/buddha-statue">Buddha statue</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/service">Service</Link>
          <Link href="/about">About</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
