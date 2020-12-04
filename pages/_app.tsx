import Head from 'next/head';
import React from 'react';
import RootStore from 'src/client/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import 'src/client/style.scss';
import {
  createMuiTheme,
  NoSsr,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");

  // https://material-ui.com/customization/default-theme/
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const title = pageProps.title || "";

  return (
    <Provider store={RootStore}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>{title}</title>
          <meta charSet="UTF-8" />
          <meta name="keywords" content="NextJS, KoaJS" />
          <meta name="author" content="Rex" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <NoSsr>
          <Component {...pageProps} />
        </NoSsr>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
