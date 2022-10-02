import { AppProps } from 'next/app';
import { toast, ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { EventWrapper } from '@/context/event';

/**
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EventWrapper>
      <Component {...pageProps} />
      <ToastContainer
        position={toast.POSITION.BOTTOM_LEFT}
        hideProgressBar={true}
      />
    </EventWrapper>
  );
}

export default MyApp;
