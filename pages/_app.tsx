import { createTheme, NoSsr, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { ClientEnvVar, DevEnvVar } from 'src/client/configs/ClientEnvVar';
import RootStore from 'src/client/store';
import { AssetsProvider } from 'src/client/context/AssetsContext';
import 'src/client/style.scss';
import 'src/client/utils/i18n';

function MyApp({ Component, pageProps }: AppProps) {
    // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
    const prefersDarkMode = false;

    // https://material-ui.com/customization/default-theme/
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                    primary: {
                        light: '#C9FCFB',
                        main: '#6ADBD8',
                        dark: '#0ABAB5',
                        contrastText: '#000',
                    },
                },
            }),
        [prefersDarkMode]
    );

    if (ClientEnvVar.IsDev) {
        console.info({ client: ClientEnvVar });
        console.info({ dev: DevEnvVar });
    }
    const store = RootStore;
    const title = pageProps.title || '';

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AssetsProvider >
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
                </AssetsProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
