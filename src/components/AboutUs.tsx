import React from 'react';
import { getTeamData } from '../utils/dataLoader';
import styles from '../styles/AboutUs.module.scss';

const AboutUs: React.FC = () => {
  const teamData = getTeamData();
  const paragraphs = teamData.summary.split('\n\n');

  return (
    <section className={styles['about-us']}>
      <div className={styles.container}>
        <h2>About Us</h2>
        <div className={styles['content-wrapper']}>
          <div className={styles['summary-container']}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={styles['team-summary']}>
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
