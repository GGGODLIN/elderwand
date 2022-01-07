import AvailableUserSlice from 'src/client/slices/AvailableUserSlice';
import React, { ChangeEvent, MouseEventHandler, useEffect } from 'react';
import { Card, CardContent, Checkbox } from '@material-ui/core';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { ICellTextProps, IHeadCellProps } from 'ka-table/props';
import { ITableProps, Table } from 'ka-table';
import { useDispatch } from 'react-redux';
import { UserVM } from 'src/client/domain/user/UserVM';

const SelectionHeader: React.FC<IHeadCellProps> = (props) => {
    const dispatch = props.dispatch;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(AvailableUserSlice.selectAllRows())
            : dispatch(AvailableUserSlice.deselectAllRows());
    };
    return <Checkbox color="primary" size="small" onChange={handleChange} />;
};

const SelectionCell: React.FC<ICellTextProps> = (props) => {
    const dispatch = props.dispatch;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = props.rowKeyValue;
        e.target.checked
            ? dispatch(AvailableUserSlice.selectRow(value))
            : dispatch(AvailableUserSlice.deselectRow(value));
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const dispatch = props.dispatch;
        const value = props.rowKeyValue;

        if (e.shiftKey) {
            dispatch(AvailableUserSlice.setRangeSelect(value));
            return;
        }

        const checked = !!e.target['checked'];
        dispatch(
            AvailableUserSlice.setRangeStart({ key: value, checked: checked })
        );
    };

    return (
        <Checkbox
            color="primary"
            size="small"
            onChange={handleChange}
            onClick={handleClick}
            checked={props.isSelectedRow}
        />
    );
};

export interface AvailableUserListProps {
    users: UserVM[];
    selected: string[];
}

export const AvailableUserList: React.FC<AvailableUserListProps> = (props) => {
    const dispatch = useDispatch();
    const tableProps: ITableProps = {
        columns: [
            { key: 'selection-cell' },
            { key: 'displayName', title: 'Name', dataType: DataType.String },
            //   { key: "display_name", title: "display_name", dataType: DataType.String
        ],
        editingMode: EditingMode.None,
        sortingMode: SortingMode.MultipleTripleStateRemote,
        rowKeyField: 'id',
        selectedRows: props.selected,
        data: props.users,
    };

    const classname = 'available-user-list';

    return (
        <div className={classname}>
            <Card>
                <CardContent>
                    <Table
                        {...tableProps}
                        dispatch={dispatch}
                        childComponents={{
                            headCell: {
                                content: (props) => {
                                    if (props.column.key === 'selection-cell') {
                                        return <SelectionHeader {...props} />;
                                    }
                                },
                            },
                            cellText: {
                                content: (props) => {
                                    if (props.column.key === 'selection-cell') {
                                        return <SelectionCell {...props} />;
                                    }
                                },
                            },
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
