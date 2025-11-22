import styles from '../common-page.module.css'; // Corrected import path

export default function About(){
  return (
    <div className={styles.pageContainer}> {/* Apply common page container style */}
      <h1>About Nalanda University</h1>
      <p>
        Nalanda University draws inspiration from the ancient center of learning and seeks to create a
        contemporary interdisciplinary campus focusing on humanities, environment, and management.
      </p>
      <p>Our campus hosts international students, research centers, and collaborative programs.</p>
    </div>
  )
}