import styles from './registrationForm.module.scss';

const RegistrationForm = ({
  email,
  setEmail,
  error,
  success,
  handleFormSubmit,
}) => {
  const renderDialogBox = () => {
    if (error) {
      return (
        <div
          className={`${styles.registrationForm__group} ${styles['registrationForm__form--error']}`}
        >
          {error.message || 'Something went wrong!'}
        </div>
      );
    }

    if (success) {
      return (
        <div
          className={`${styles.registrationForm__group} ${styles['registrationForm__form--success']}`}
        >
          {success}
        </div>
      );
    }

    return '';
  };

  return (
    <section className={styles.registrationForm}>
      <form
        data-netlify="true"
        name="registrationForm"
        id="registration-form"
        method="POST"
        className={`${styles.registrationForm__form} ${
          success && styles['registrationForm__form-success']
        } ${error && styles['registrationForm__form-error']} `}
        onSubmit={handleFormSubmit}
      >
        <h4>Register for this event.</h4>
        {renderDialogBox()}

        <input type="hidden" name="form-name" value="registrationForm" />
        <div className={styles.registrationForm__group}>
          <input
            aria-label="email"
            id="email-input"
            className={styles.registrationForm__input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.registrationForm__button}>
          Register
        </button>
      </form>
    </section>
  );
};

export default RegistrationForm;
