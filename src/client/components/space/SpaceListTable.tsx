import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, { ChangeEvent, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SpaceSlice from 'src/client/slices/SpaceSlice';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { RootState } from 'src/client/reducer';
import { SpaceVM } from 'src/client/domain/space/SpaceVM';
import { useDispatch, useSelector } from 'react-redux';
import {
    Checkbox,
    Collapse,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';

interface SpaceListTableProp {
    spaces: SpaceVM[];
    selected: [];
}

const SpaceListTable: React.FC<SpaceListTableProp> = (props) => {
    const classname = 'space-list-table';

    const { spaces_count, checked_list_count } = useSelector(
        (state: RootState) => {
            const spaces_count = state.space.spaces.length;
            const checked_list_count = Object.keys(
                state.space.space_checked_map
            ).filter((key) => {
                if (!!state.space.space_checked_map[key]) {
                    return key;
                }
            }).length;

            return {
                spaces_count,
                checked_list_count,
            };
        }
    );

    const root = props.spaces.find((space) => space.parent_id == '');

    const rows = !root
        ? []
        : [root]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((space) => (
                  <SpaceTableRow
                      key={space.id}
                      rowData={space}
                      spaces={props.spaces}
                  />
              ));

    return (
        <TableContainer className={classname}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        {/* Collapse */}
                        <TableCell>{spaces_count}</TableCell>
                        {/* Selected */}
                        <TableCell className={'selected'}>
                            {checked_list_count}
                        </TableCell>
                        <TableCell className={'name'}>{'Name'}</TableCell>
                        <TableCell className={'device-count'}>
                            {'Device Count'}
                        </TableCell>
                        <TableCell className={'fe-count'}>
                            {'Engineer Count'}
                        </TableCell>
                        <TableCell className={'icon-path'}>
                            {'Icon Path'}
                        </TableCell>
                        <TableCell className={'actions'}>{''}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        </TableContainer>
    );
};

interface SpaceTableRowProps {
    rowData: SpaceVM;
    spaces: SpaceVM[];
    level?: number;
}

const SpaceTableRow: React.FC<SpaceTableRowProps> = (props) => {
    const dispatch = useDispatch();

    const row = props.rowData;
    const leaves = !props.spaces
        ? []
        : props.spaces
              .filter((space) => space.parent_id == row.id)
              .sort((a, b) => a.name.localeCompare(b.name));
    const hasLeaves = leaves.length > 0;

    const level = props.level >= 0 ? props.level + 1 : 0;

    const [open, setOpen] = useState(level == 0);

    const handleCollapse = () => {
        setOpen(!open);
    };

    const [hover, setHover] = useState(false);
    const handleMouseEnter = () => {
        setHover(true);
    };
    const handleMouseLeave = () => {
        setHover(false);
    };
    const style: CSSProperties = {
        backgroundColor: hover ? '#C9FCFB' : '',
        color: hover ? 'black' : '',
    };

    const handleCheck = (
        e: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        const payload = { ...row, checked };
        dispatch(SpaceSlice.setCheckbox(payload));
    };

    const { checked } = useSelector((state: RootState) => {
        const checked = !!state.space.space_checked_map[row.id];
        return { checked };
    });

    return (
        <React.Fragment>
            {/* <div ></div> */}
            <TableRow
                className={`level level-${level}`}
                // onClick={handleCollapse}
                onDoubleClick={handleCollapse}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={style}
            >
                <TableCell>
                    {hasLeaves && (
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={handleCollapse}
                        >
                            {open ? (
                                <KeyboardArrowDownIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    )}
                </TableCell>
                <TableCell className={'selected'}>
                    <Checkbox onChange={handleCheck} checked={checked} />
                </TableCell>
                <TableCell className={'name'}>{row.name}</TableCell>
                <TableCell className={'device-count'}>
                    {'Device Count'}
                </TableCell>
                <TableCell className={'fe-count'}>{'Engineer Count'}</TableCell>
                <TableCell className={'icon-path'}>{row.icon}</TableCell>
                <TableCell className={'row-actions'}>
                    <ActionCell />
                </TableCell>
            </TableRow>

            {leaves && (
                <TableRow className={`level level-${level}`}>
                    <TableCell colSpan={12}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <SpaceListRowTable
                                level={level}
                                rowData={row}
                                spaces={props.spaces}
                            />
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </React.Fragment>
    );
};

interface SpaceListRowTableProp {
    rowData: SpaceVM;
    spaces: SpaceVM[];
    level?: number;
    checked_list?: string[];
}

const SpaceListRowTable: React.FC<SpaceListRowTableProp> = (props) => {
    const row = props.rowData;
    const leaves = !props.spaces
        ? []
        : props.spaces.filter((space) => space.parent_id == row.id);

    const rows = leaves
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((space) => (
            <SpaceTableRow
                key={space.id}
                rowData={space}
                spaces={props.spaces}
                level={props.level}
            />
        ));

    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableBody>{rows}</TableBody>
            </Table>
        </TableContainer>
    );
};

const ActionCell: React.FC<{}> = (props) => {
    return (
        <Grid className={'row-actions'} container justify="flex-end">
            <Grid item>
                <IconButton
                    onClick={() => {
                        console.log('click');
                    }}
                >
                    <AccountBoxIcon />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton
                    onClick={() => {
                        console.log('click');
                    }}
                >
                    <SettingsIcon />
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton
                    onClick={() => {
                        console.log('click');
                    }}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default SpaceListTable;
