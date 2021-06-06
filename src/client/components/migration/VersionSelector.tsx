import React, { ChangeEvent } from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const VersionSelector: React.FC<{}> = () => {
    const classname = 'version-selector';
    const id = 'version-selector';

    const handleChange = (
        e: ChangeEvent<{
            name?: string;
            value: unknown;
        }>
    ) => {
        console.log({ name: e.target.name, value: e.target.value });
    };

    return (
        <FormControl variant="outlined" className={classname}>
            <InputLabel htmlFor={id}>{'Version'}</InputLabel>
            <Select
                native
                // value={state.age}
                onChange={handleChange}
                label="Version"
                inputProps={{
                    name: 'version',
                    id: id,
                }}
                defaultValue={200}
            >
                {/* <option aria-label="None" value="" /> */}
                {/* 100 or "version_1_0_0" */}
                <option value={100}>{'1.0.0'}</option>
                <option value={200}>{'2.0.0'}</option>
            </Select>
        </FormControl>
    );
};

export default VersionSelector;
