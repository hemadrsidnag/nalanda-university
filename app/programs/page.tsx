import styles from '../common-page.module.css'; // Corrected import path

export default function Programs(){
  return (
    <div className={styles.pageContainer}> {/* Apply common page container style */}
      <h1>Programs</h1>
      <p>Explore our postgraduate and doctoral programs across multiple schools.</p>
    </div>
  )
}