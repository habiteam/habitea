import '../styles/globals.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect } from 'react';
import { Provider } from 'jotai';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { initIcons } from '../common/utils/fontawesome-icons';
import { auth } from '../common/services/firebase';

initIcons();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // We gonna probably save user shit here to atom not push to certain path
        console.log(user);
        router.push('/app');
      }
    });

    return () => unsubscribe();
  }, []);

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return <Provider>{getLayout(<Component {...pageProps} />)}</Provider>;
}
