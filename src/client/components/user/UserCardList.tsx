import React from 'react';
import { Grid } from '@material-ui/core';
import { UserCard } from 'src/client/components/user/UserCard';
import { UserVM } from 'src/client/domain/user/UserVM';

export const UserCardList: React.FC<{ users: UserVM[] }> = (props) => {
    if (!props.users.length) {
        return <React.Fragment />;
    }

    const elements = props.users.map((user, idx) => {
        return (
            <Grid item={true} xs={3} key={user.id}>
                <UserCard key={idx} user={user} />
            </Grid>
        );
    });

    return (
        <Grid
            container={true}
            direction="row"
            justify="space-around"
            alignItems="center"
        >
            {elements}
        </Grid>
    );
};
