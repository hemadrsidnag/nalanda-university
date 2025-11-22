"use client"; // This component needs client-side features like useEffect

import Image from 'next/image';
import { useEffect, useRef } from 'react'; // Import useEffect and useRef for animations
import ProgramCard from '../components/ProgramCard';
import NewsCard from '../components/NewsCard';
import styles from './home.module.css';

export default function Home() {
  const animatedRefs = useRef<(HTMLElement | null)[]>([]); // Correctly type animatedRefs
  const heroRef = useRef<HTMLDivElement>(null); // Correctly type heroRef

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
        } else {
          entry.target.classList.remove(styles.isVisible); // Optional: remove on un-intersect
        }
      });
    }, observerOptions);

    animatedRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Parallax for hero image (simplified example, can be more complex)
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${-scrollY * 0.3}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observer) {
        animatedRefs.current.forEach((ref) => {
          if (ref) {
            observer.unobserve(ref);
          }
        });
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => { // Type 'el' parameter
    if (el && !animatedRefs.current.includes(el)) {
      animatedRefs.current.push(el);
    }
  };

  return (
    <div className={styles.heroWrap}>
      <section className={`${styles.hero}`} ref={heroRef}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Nalanda University</h1>
          <p className={styles.subtitle}>Reviving an ancient tradition of learning for a modern world.</p>
          <div className={styles.ctas}>
            <a className={styles.btnPrimary} href="/programs">Explore Programs</a>
            <a className={styles.btnOutline} href="/contact">Contact Admissions</a>
          </div>
        </div>
        <div className={styles.heroImage}>
          {/* Replace with an actual image in /public */}
          <Image src="/campus-placeholder.jpg" alt="Nalanda campus" width={720} height={420} />
        </div>
      </section>

      <section className={`${styles.about} ${styles.animatedSection}`} ref={addToRefs}>
        <div className={styles.container}>
          <h2>About Nalanda</h2>
          <p>
            Nalanda University traces its roots to a 5th century residential university. Today the
            revived Nalanda is an international centre for higher learning, research, and cultural
            exchange. Our mission is to blend classical knowledge traditions with contemporary
            research and practice.
          </p>
          <a className={styles.link} href="/about">Learn more about our history →</a>
        </div>
      </section>

      <section className={`${styles.programsSection} ${styles.animatedSection}`} ref={addToRefs}>
        <div className={styles.container}>
          <h2>Schools & Programs</h2>
          <div className={styles.programsGrid}>
            <ProgramCard title="School of Historical Studies" desc="Archaeology, ancient history, cultural studies." />
            <ProgramCard title="School of Ecology & Environment" desc="Climate science, sustainability, biodiversity." />
            <ProgramCard title="School of Buddhist Studies" desc="Philosophy, textual studies, comparative religion." />
            <ProgramCard title="School of Management Studies" desc="Development management, leadership." />
          </div>
        </div>
      </section>

      <section className={`${styles.researchSection} ${styles.animatedSection}`} ref={addToRefs}>
        <div className={styles.container}>
          <h2>Research Highlights</h2>
          <div className={styles.researchGrid}>
            <NewsCard title="Manuscripts Digitalization" excerpt="A multi-year project to digitize and annotate ancient manuscripts." />
            <NewsCard title="Climate Resilience Lab" excerpt="Community-focused research on sustainable practices in the Gangetic plains." />
            <NewsCard title="Buddhist Textual Studies" excerpt="Collaborative philological research across Asia." />
          </div>
        </div>
      </section>

      <section className={`${styles.timelineSection} ${styles.animatedSection}`} ref={addToRefs}>
        <div className={styles.container}>
          <h2>Nalanda — A Short Timeline</h2>
          <ul className={styles.timeline}>
            <li><strong>5th Century</strong> — Nalanda flourishes as a center of learning</li>
            <li><strong>1193</strong> — Ancient Nalanda is destroyed</li>
            <li><strong>2010</strong> — Nalanda University Act & international revival begins</li>
            <li><strong>Present</strong> — Global collaborations & research</li>
          </ul>
        </div>
      </section>

      <section className={`${styles.admissions} ${styles.animatedSection}`} ref={addToRefs}>
        <div className={styles.container}>
          <h2>Admissions 2025</h2>
          <p>Applications open for postgraduate and doctoral programs. Scholarships available.</p>
          <div className={styles.ctas}>
            <a className={styles.btnPrimary} href="/contact">Apply Now</a>
            <a className={styles.btnOutline} href="/downloads/prospectus.pdf">Download Prospectus</a>
          </div>
        </div>
      </section>
    </div>
  );
}