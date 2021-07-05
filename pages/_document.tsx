import * as React from 'react';
import Document, {
    Head,
    Main,
    NextScript,
    DocumentInitialProps,
    Html,
    DocumentContext,
} from 'next/document';

export interface IntlDocumentInitialProps extends DocumentInitialProps {
    location: Location;
}

interface Location {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    origin: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
}

export default class IntlDocument extends Document<IntlDocumentInitialProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        const location = {
            url: ctx.req?.headers.location,
            referer: ctx.req?.headers.referer,
            cookie: ctx.req?.headers.cookie,
        };
        return { ...initialProps, ...location };
    }

    render() {
        const lang = 'en';

        return (
            <Html lang={lang} style={{ backgroundColor: '#c9fcfb' }}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
