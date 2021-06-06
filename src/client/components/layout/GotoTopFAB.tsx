import clsx from 'clsx';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LayoutSlice from 'src/client/slices/LayoutSlice';
import React, { useEffect } from 'react';
import { Fab, Zoom } from '@material-ui/core';
import { RootState } from 'src/client/reducer';
import { useDispatch, useSelector } from 'react-redux';

let GotoTopBtn: Element;
let Target: Element;

export const GotoTopFAB: React.FC<{ target: string }> = (props) => {
    const dispatch = useDispatch();
    const { show } = useSelector((state: RootState) => state.layout.goto_top);

    const classname = clsx(['fab', 'goto-top-btn', show ? '' : 'hidden']);

    useEffect(() => {
        GotoTopBtn = document.querySelector('.fab.goto-top-btn');

        Target = document.querySelector(props.target);

        Target.addEventListener('scroll', () => {
            const hidden = GotoTopBtn.classList.contains('hidden');

            if (Target.scrollTop == 0) {
                dispatch(LayoutSlice.showGotoTop(false));
                return;
            }

            if (hidden) {
                dispatch(LayoutSlice.showGotoTop(true));
            }
        });
    }, []);

    return (
        <Zoom in={show} timeout={500}>
            <Fab
                className={classname}
                onClick={() => {
                    Target.scroll({ top: 0, behavior: 'smooth' });
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Zoom>
    );
};
