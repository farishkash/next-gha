import { useState } from 'react';
import Head from 'next/head';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SecondaryPage from '../components/SecondaryPage';
import DonationForm from '../components/DonationForm';

const defaultFormState = {
  name: '',
  email: '',
  amount: '',
};

const Donate = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [formState, setFormState] = useState(defaultFormState);

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateField = (fieldName) => (event) =>
    setFormState({ ...formState, [fieldName]: event.target.value });

  const submitPayment = async (stripeIntentSecret) => {
    const cardElement = elements.getElement(CardElement);
    console.log(formState);
    try {
      const { paymentIntent } = await stripe.confirmCardPayment(
        stripeIntentSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: formState.name, email: formState.email },
          },
        },
      );

      console.log(paymentIntent);
      setProcessing(false);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(err);
      setProcessing(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch('/api/stripe', {
        method: 'POST',
        body: JSON.stringify({
          amount: formState.amount,
        }),
      });

      if (!res.ok) {
        console.log(res);
        throw new Error('Something went wrong!');
      }

      const stripePaymentIntent = await res.json();
      submitPayment(stripePaymentIntent.intentSecret);
    } catch (err) {
      console.log(err);
      setError(err);
      setProcessing(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Head>
        <title>Donate to Meet/Hang/Code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SecondaryPage title="Donate to Meet/Hang/Code">
        <p>
          Thank you for taking the time to consider donating to Meet/Hang/Code.
          Your contributions make it possible for us to stay up and running and
          providing you with the most up-to-date information on what's happening
          in development!
        </p>
        {stripe ? (
          <DonationForm
            formState={formState}
            handleUpdateField={handleUpdateField}
            handleFormSubmit={handleFormSubmit}
            processing={processing}
            success={success}
            error={error}
            setError={setError}
            CardElement={CardElement}
          />
        ) : (
          <h2>
            There's a problem loading Stripe for payments. Try again later!
          </h2>
        )}
      </SecondaryPage>
      <Footer />
    </div>
  );
};
export default Donate;
