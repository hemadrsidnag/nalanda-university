import Link from 'next/link'
import styles from './Header.module.css'

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}><Link href="/">Nalanda University</Link></div>
        <nav className={styles.nav}>
          <Link href="/about">About</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
