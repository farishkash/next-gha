import Link from 'next/link';
import Image from 'next/image';
import { GraphCMSImageLoader } from '../../utils/graphcms-loader';

import styles from './featuredEventSection.module.scss';

const defaultEvent = {
  slug: '/',
  featuredImage: { url: '/images/featured-4.jpg' },
  name: 'No featured event at the moment!',
};

const FeaturedEventSection = ({ event = { ...defaultEvent } }) => {
  return (
    <section className={styles.featuredEventSection}>
      <div className={styles.featuredEventSection__grid}>
        <Link href={`/events/${event.slug}`}>
          <a className={styles.featuredEventSection__event}>
            <Image
              loader={GraphCMSImageLoader}
              className={styles['featuredEventSection__event-image']}
              src={event.featuredImage.url}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <div className={styles['featuredEventSection__event-details']}>
              <span>
                <h2>Featured Event</h2>
                <h3>{event.name}</h3>
                {event.eventDate && (
                  <h4>
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'full',
                    }).format(new Date(event.eventDate))}
                  </h4>
                )}
              </span>
            </div>
          </a>
        </Link>
        <Link href="/about">
          <a className={styles.featuredEventSection__callout}>
            <span>Learn more about us.</span>
          </a>
        </Link>
        <Link href="/donate">
          <a className={styles.featuredEventSection__callout}>
            <span>Donate and keep the meetups coming!</span>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedEventSection;
