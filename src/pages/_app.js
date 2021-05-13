import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import 'normalize.css';
import '../styles/globals.scss';

const stripePromise = loadStripe(
  'pk_test_51IGVGVGjzZBtdwJusNWLBh3BFpGasBmPeZOYDwO85WcuL7HmMSq5zsw1LfcR0ZTWN2DuKfigvnAnAeYvHNLRaUrp00OQMu5ZUj',
);

const App = ({ Component, pageProps }) => {
  return (
    <Elements stripe={stripePromise}>
      <Component {...pageProps} />
    </Elements>
  );
};

export default App;
