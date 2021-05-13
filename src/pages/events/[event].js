import { useState } from 'react';
import Head from 'next/head';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import EventBanner from '../../components/EventBanner';
import EventContent from '../../components/EventContent';
import RegistrationForm from '../../components/RegistrationForm';

import { getAllEventSlugs, getEventData } from '../../utils/events';

const encode = (data) => {
  return Object.keys(data)
    .map(
      (key) => `${encodeURIComponent(key)} = ${encodeURIComponent(data[key])}`,
    )
    .join('&');
};

const Event = ({ eventData }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError('Please enter your email!');
      return;
    }

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'registrationForm',
          event: eventData.name,
          email,
        }),
      });

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      console.log(res);
      setSuccess('Registration complete!');
      setError(null);
      setEmail('');
    } catch (err) {
      console.log(err);
      setError('Something went wrong!');
      setSuccess(null);
    }
  };

  return (
    <div className="page-wrapper">
      <Head>
        <title>{eventData.name} || Meet/Hang/Code</title>
      </Head>
      <Header />
      <main>
        <EventBanner
          name={eventData.name}
          date={new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
          }).format(new Date(eventData.eventDate))}
          featuredImage={eventData.featuredImage}
        />
        <EventContent
          speakers={eventData.speakers}
          where={eventData.location}
          description={eventData.description}
        />
        <RegistrationForm
          handleFormSubmit={handleFormSubmit}
          email={email}
          setEmail={setEmail}
          error={error}
          success={success}
        />
      </main>
      <Footer />
    </div>
  );
};

export const getStaticPaths = async () => {
  const paths = await getAllEventSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const eventData = await getEventData(params.event);
  return {
    props: {
      eventData,
    },
  };
};

export default Event;
