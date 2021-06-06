import AllocateUserSlice from 'src/client/slices/AllocateUserSlice';
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
            ? dispatch(AllocateUserSlice.selectAllRows())
            : dispatch(AllocateUserSlice.deselectAllRows());
    };
    return <Checkbox color="primary" size="small" onChange={handleChange} />;
};

const SelectionCell: React.FC<ICellTextProps> = (props) => {
    const dispatch = props.dispatch;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = props.rowKeyValue;
        e.target.checked
            ? dispatch(AllocateUserSlice.selectRow(value))
            : dispatch(AllocateUserSlice.deselectRow(value));
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const dispatch = props.dispatch;
        const value = props.rowKeyValue;

        if (e.shiftKey) {
            dispatch(AllocateUserSlice.setRangeSelect(value));
            return;
        }

        const checked = !!e.target['checked'];
        dispatch(
            AllocateUserSlice.setRangeStart({ key: value, checked: checked })
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

interface AllocateUserListProps {
    users: UserVM[];
    selected: string[];
}

export const AllocateUserList: React.FC<AllocateUserListProps> = (props) => {
    const dispatch = useDispatch();

    const tableProps: ITableProps = {
        columns: [
            { key: 'selection-cell' },
            { key: 'username', title: 'Name', dataType: DataType.String },
            //   { key: "display_name", title: "display_name", dataType: DataType.String },
        ],
        editingMode: EditingMode.None,
        sortingMode: SortingMode.MultipleTripleStateRemote,
        rowKeyField: 'id',
        data: props.users,
        selectedRows: props.selected,
    };

    const classname = 'allocate-user-list';

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
