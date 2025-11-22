import styles from './Footer.module.css'

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>© {new Date().getFullYear()} Nalanda University</div>
        <div className={styles.links}>
          <a href="/privacy">Privacy</a>
          <a href="/downloads/prospectus.pdf">Prospectus</a>
        </div>
      </div>
    </footer>
  )
}
