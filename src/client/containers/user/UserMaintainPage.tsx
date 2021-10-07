import clsx from 'clsx';
import React, { useEffect, Dispatch } from 'react';
import UserSlice from 'src/client/slices/UserSlice';
import { AddUserFAB } from 'src/client/components/user/AddUserFAB';
import { AxiosError, AxiosInstance } from 'axios';
import { AxiosUtil, PaginationParams } from 'src/client/utils/AxiosUtil';
//import { Dispatch } from 'redux';
import { RootState } from 'src/client/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { UserCardList } from 'src/client/components/user/UserCardList';
import { UserVM } from 'src/client/domain/user/UserVM';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import FetchSlice from 'src/client/slices/FetchSlice';

let PreviousParams: {
    limit: number;
    offset: number;
} = { limit: -1, offset: -1 };

const PageSize = 48;

const fetchUsers = (dispatch: Dispatch<any>) => {
    const url = `/api/users`;
    const params = {};

    new AxiosFactory()
        .useBearerToken()
        .useBefore(() => {
            dispatch(FetchSlice.start());
        })
        .getInstance()
        .get<any>(url, { params: params })
        .then((res) => {
            console.log('fetchUsers', res)
            dispatch(UserSlice.fetch(res.data));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            dispatch(FetchSlice.end());
        });
};

const fetchUser = (
    client: AxiosInstance,
    params: PaginationParams,
    callback: Function
) => {
    client
        .get<any>('/api/users', { params: params })
        .then((res) => {
            if (res.data.offset === 0) {
                setTimeout(() => {
                    const main = document.querySelector('main');
                    main.scroll({ top: 0, behavior: 'smooth' });
                }, 100);
            }
            callback(res.data);
        })
        .catch((err: AxiosError) => {
            console.log(err.message);
            //AxiosUtil.redirectUnAuthorization(err);
        });
};

const fetchUserOnInitial = (
    client: AxiosInstance,
    dispatch: Dispatch<any>,
    refresh: boolean
) => {
    useEffect(() => {
        const params = {
            limit: PageSize,
            offset: 0,
        };

        if (refresh) {
            fetchUser(client, params, (payload: any) => {
                dispatch(UserSlice.fetch(payload));
            });
        }
    }, [refresh]);
};

const fetchUserOnScroll = (
    isLoading: boolean,
    offset: number,
    total: number,
    limit: number,
    client: AxiosInstance,
    dispatch: Dispatch<any>
) => {
    useEffect(() => {
        const main = document.querySelector('main');

        if (!main) {
            return;
        }

        if (isLoading) {
            main.onscroll = () => { };
            return;
        }

        main.onscroll = (e) => {
            const position = main.scrollHeight - main.scrollTop;
            const height = main.clientHeight;

            if (position - height > 300) {
                return;
            }

            if (isLoading) {
                return;
            }

            if (offset >= total) {
                return;
            }

            const params = {
                limit: limit,
                offset: offset,
            };

            if (offset == PreviousParams.offset) {
                return;
            }

            PreviousParams = params;

            main.onscroll = () => { };

            fetchUser(client, params, (payload: any) => {
                dispatch(UserSlice.push(payload));
            });
        };
    }, [isLoading, limit, offset, total]);
};

export interface UserMaintainPageProps {
    title: string;
}

export const UserMaintainPage: React.FC<UserMaintainPageProps> = () => {
    const name = 'user';
    const classname = `${name} page`;
    const dispatch = useDispatch();

    // const origin = AxiosUtil.getOriginWithPort();
    // const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

    const { isLoading } = useSelector((state: RootState) => state.fetch);
    const { users, limit, offset, total } = useSelector((state: RootState) => {
        const pvm = state.user.page_result;
        return {
            offset: pvm.offset,
            limit: pvm.limit,
            total: pvm.total,
            users: pvm.results,
        };
    });

    const { refresh } = useSelector((state: RootState) => {
        return { refresh: state.user.fetch_user_refresh };
    });

    const { goto_top } = useSelector((state: RootState) => state.layout);

    //fetchUserOnScroll(isLoading, offset, total, limit, client, dispatch);

    //fetchUserOnInitial(client, dispatch, refresh);

    const actions = clsx(['fab-actions', goto_top.show ? 'with-goto-top' : '']);

    useEffect(() => {
        fetchUsers(dispatch);
        return () => { };
    }, []);

    return (
        <React.Fragment>
            <div className={classname}>
                <div className="user-card-grid">
                    <UserCardList users={users} />
                </div>
                <div className={actions}>
                    <AddUserFAB />
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserMaintainPage;
