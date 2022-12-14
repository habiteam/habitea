import '../styles/globals.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'jotai';
import { NotificationProvider } from '@commonComponents/Notifications/NotificationProvider';
import { initIcons } from '@utils/fontawesome-icons';

initIcons();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <Provider>
      <NotificationProvider>
        {getLayout(<Component {...pageProps} />)}
      </NotificationProvider>
    </Provider>
  );
}
