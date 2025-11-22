import styles from './ProgramCard.module.css'

export default function ProgramCard({title, desc}:{title:string, desc:string}){
  return (
    <article className={styles.card}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <a href="/programs">Learn more →</a>
    </article>
  )
}
