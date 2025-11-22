import styles from '../common-page.module.css'; // Corrected import path

export default function Contact(){
  return (
    <div className={styles.pageContainer}> {/* Apply common page container style */}
      <h1>Contact Admissions</h1>
      <div className={styles.contactInfo}> {/* New div for contact info */}
        <p>Email: <a href="mailto:admissions@nalanda.edu">admissions@nalanda.edu</a></p>
        <p>Phone: +91-XXXXXXXXXX</p>
      </div>
      <form action="https://formspree.io/f/YOUR_ID" method="POST" className={styles.contactForm}> {/* Apply form style */}
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" type="email" required />
        <textarea name="message" placeholder="Message" rows={6} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}