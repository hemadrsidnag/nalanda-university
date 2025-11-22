import styles from './NewsCard.module.css'

export default function NewsCard({title, excerpt}:{title:string, excerpt:string}){
  return (
    <article className={styles.card}>
      <h4>{title}</h4>
      <p>{excerpt}</p>
      <a href="/news">Read more</a>
    </article>
  )
}
