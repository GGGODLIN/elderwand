import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import BuildIcon from "@material-ui/icons/Build";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ProjectSlice from "src/client/slices/ProjectSlice";
import PublishIcon from "@material-ui/icons/Publish";
import React, { ChangeEvent } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
import { ICellTextProps, IHeadCellProps } from "ka-table/props";
import { ITableProps, Table } from "ka-table";
import { ProjectVM } from "src/client/domain/project/ProjectVM";
import { TimeUtil } from "src/client/utils/TimeUtil";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Checkbox,
  Grid,
  IconButton,
} from "@material-ui/core";

const SelectionHeader: React.FC<IHeadCellProps> = (props) => {
  const dispatch = props.dispatch;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? dispatch(ProjectSlice.selectAllRows())
      : dispatch(ProjectSlice.deselectAllRows());
  };
  return <Checkbox color="primary" size="small" onChange={handleChange} />;
};

const SelectionCell: React.FC<ICellTextProps> = (props) => {
  const dispatch = props.dispatch;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = props.rowKeyValue;
    e.target.checked
      ? dispatch(ProjectSlice.selectRow(value))
      : dispatch(ProjectSlice.deselectRow(value));
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const dispatch = props.dispatch;
    const value = props.rowKeyValue;

    if (e.shiftKey) {
      dispatch(ProjectSlice.setRangeSelect(value));
      return;
    }

    const checked = !!e.target["checked"];
    dispatch(ProjectSlice.setRangeStart({ key: value, checked: checked }));
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

const UpdatedTimeCell: React.FC<ICellTextProps> = (props) => {
  const data: ProjectVM = props.rowData;
  const value = TimeUtil.new(data.updated_at).format("YYYY-MM-DD HH:mm");
  return <div>{value}</div>;
};

const ExpireDateCell: React.FC<ICellTextProps> = (props) => {
  const data: ProjectVM = props.rowData;
  const value = TimeUtil.new(data.expire_date).format("YYYY-MM-DD");
  return <div>{value}</div>;
};

const ActionCell: React.FC<{}> = (props) => {
  return (
    <Grid className={"row-actions"} container justify="flex-end">
      <Grid item>
        <IconButton
          onClick={() => {
            console.log("click");
          }}
        >
          <AccountBoxIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          onClick={() => {
            console.log("click");
          }}
        >
          <AttachFileIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          onClick={() => {
            console.log("click");
          }}
        >
          <PublishIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          onClick={() => {
            console.log("click");
          }}
        >
          <VisibilityIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          onClick={() => {
            console.log("click");
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          onClick={() => {
            console.log("click");
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          onClick={() => {
            console.log("click");
          }}
        >
          <BuildIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const GroupCountCell: React.FC<ICellTextProps> = (props) => {
  const data: ProjectVM = props.rowData;
  return <div>{data.groups.length}</div>;
};

const UserCountCell: React.FC<ICellTextProps> = (props) => {
  const data: ProjectVM = props.rowData;

  const count = data.groups
    .map((group) => {
      return group.users.length;
    })
    .reduce((p, c) => {
      return p + c;
    }, 0);

  return <div>{count}</div>;
};
export interface ProjectListTableProps {
  projects: ProjectVM[];
  selected: string[];
}

export const ProjectListTable: React.FC<ProjectListTableProps> = (props) => {
  const dispatch = useDispatch();
  const tableProps: ITableProps = {
    columns: [
      { key: "selection-cell" },
      { key: "name", title: "Name", dataType: DataType.String },
      { key: "code", title: "Project Code", dataType: DataType.String },
      {
        key: "cloud_code_name",
        title: "Cloud Code",
        dataType: DataType.String,
      },
      { key: "group_count", title: "Group" },
      { key: "user_count", title: "User" },
      { key: "status_code", title: "Status", dataType: DataType.String },
      { key: "updated_at", title: "Time" },
      { key: "expire_date", title: "Expire" },
      { key: "action-cell" },
    ],
    editingMode: EditingMode.None,
    sortingMode: SortingMode.MultipleTripleStateRemote,
    rowKeyField: "id",
    selectedRows: props.selected,
    data: props.projects,
  };

  return (
    <div className="project-list-table">
      <Card>
        <CardContent>
          <Table
            {...tableProps}
            dispatch={dispatch}
            childComponents={{
              headCell: {
                content: (props) => {
                  if (props.column.key === "selection-cell") {
                    return <SelectionHeader {...props} />;
                  }
                },
              },
              cellText: {
                content: (props) => {
                  if (props.column.key === "selection-cell") {
                    return <SelectionCell {...props} />;
                  }
                  if (props.column.key === "action-cell") {
                    return <ActionCell {...props} />;
                  }

                  if (props.column.key === "group_count") {
                    return <GroupCountCell {...props} />;
                  }

                  if (props.column.key === "user_count") {
                    return <UserCountCell {...props} />;
                  }

                  if (props.column.key === "updated_at") {
                    return <UpdatedTimeCell {...props} />;
                  }

                  if (props.column.key === "expire_date") {
                    return <ExpireDateCell {...props} />;
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
