import { useState } from 'react';

import styles from './donationForm.module.scss';

const DonationForm = ({
  formState,
  handleUpdateField,
  handleFormSubmit,
  processing,
  success,
  error,
  setError,
  CardElement,
}) => {
  const [cardComplete, setCardComplete] = useState(false);
  const [isCardFocused, setIsCardFocused] = useState(false);

  const renderDialogBox = () => {
    if (error) {
      return (
        <div
          className={`${styles.donationForm__group} ${styles['donationForm__form--error']}`}
        >
          {error.message || 'Something went wrong!'}
        </div>
      );
    }

    if (success) {
      return (
        <div
          className={`${styles.donationForm__group} ${styles['donationForm__form--success']}`}
        >
          Thank you for your donation! See you at the next event!
        </div>
      );
    }

    return '';
  };

  return (
    <section className={styles.donationForm}>
      <form
        className={`${styles.donationForm__form} ${
          success && styles['donationForm__form-success']
        } ${error && styles['donationForm__form-error']} `}
        onSubmit={(event) => handleFormSubmit(event, formState)}
      >
        {renderDialogBox()}

        <div className={styles.donationForm__group}>
          <label htmlFor="name-input" className={styles.donationForm__label}>
            Name
          </label>
          <input
            id="name-input"
            className={styles.donationForm__input}
            type="text"
            value={formState.name}
            onChange={handleUpdateField('name')}
          />
        </div>
        <div className={styles.donationForm__group}>
          <label htmlFor="email-input" className={styles.donationForm__label}>
            Email
          </label>
          <input
            id="email-input"
            className={styles.donationForm__input}
            type="email"
            value={formState.email}
            onChange={handleUpdateField('email')}
          />
        </div>

        <div className={styles.donationForm__group}>
          <label
            htmlFor="donation-select"
            className={styles.donationForm__label}
          >
            Donation Amount
          </label>
          <select
            required
            id="donation-select"
            className={`${styles.donationForm__input} ${
              styles[`donationForm__input-select`]
            }`}
            value={formState.amount}
            onChange={handleUpdateField('amount')}
          >
            <option value="" disabled>
              Select an amount...
            </option>
            <option value="500">$5.00 USD</option>
            <option value="1000">$10.00 USD</option>
            <option value="2000">$20.00 USD</option>
          </select>
        </div>

        <div className={styles.donationForm__group}>
          <label
            htmlFor="card-input"
            className={`${styles.donationForm__label} ${
              isCardFocused ? styles['donationForm__label--focus'] : ''
            }`}
          >
            Card Info
          </label>
          <CardElement
            id="card-input"
            className={`${styles.donationForm__input} ${
              isCardFocused ? styles['donationForm__input--focus'] : ''
            }`}
            onChange={(event) => {
              setError(event.error);
              setCardComplete(event.complete);
            }}
            onFocus={() => setIsCardFocused(true)}
            onBlur={() => setIsCardFocused(false)}
            options={{
              style: {
                base: {
                  padding: '12px',
                  iconColor: '#000',
                  color: '#000',
                  fontWeight: '400',
                  fontFamily: '"IBM Plex Mono", sans-serif',
                  fontSize: '20px',
                  '::placeholder': { color: '#000' },
                },
                invalid: {
                  iconColor: '#fa4141',
                  color: '#fa4141',
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          className={styles.donationForm__button}
          disabled={!cardComplete || processing}
        >
          {processing ? 'Processing...' : 'Make Donation'}
        </button>
      </form>
    </section>
  );
};

export default DonationForm;
