import clsx from 'clsx';
import React from 'react';
import { Backdrop, CircularProgress, Container } from '@material-ui/core';
import { Copyright } from 'src/client/components/layout/Copyright';
import { GotoTopFAB } from 'src/client/components/layout/GotoTopFAB';
import { HeaderBar } from 'src/client/components/layout/HeaderBar';
import { RootState } from 'src/client/reducer';
import { useSelector } from 'react-redux';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = (props) => {
    const { layout } = useSelector((state: RootState) => state);

    const { isLoading } = useSelector((state: RootState) => state.fetch);

    const overlay = clsx(['overlay', isLoading ? 'open' : 'close']);

    return (
        <React.Fragment>
            {layout.header.display && <HeaderBar />}

            {layout.main.display && <main>{props.children}</main>}

            {layout.footer.display && (
                <footer>
                    <Container maxWidth={'xl'}>
                        <Copyright />
                    </Container>
                </footer>
            )}

            {layout.goto_top.display && <GotoTopFAB target={'main'} />}

            <Backdrop className={overlay} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </React.Fragment>
    );
};

export default Layout;
