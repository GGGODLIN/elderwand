import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import clsx from "clsx";
import DataMigrationSlice from "src/client/slices/DataMigrationSlice";
import DeviceTreeView from "src/client/components/migration/DeviceTreeView";
import FetchSlice from "src/client/slices/FetchSlice";
import ProjectTreeView from "src/client/components/migration/ProjectTreeView";
import React, { ChangeEvent, useState } from "react";
import SpacePreviewTreeView from "src/client/components/migration/SpacePreviewTreeView";
import VersionSelector from "src/client/components/migration/VersionSelector";
import { AxiosUtil } from "src/client/utils/AxiosUtil";
import { ClientEnvVar, DevEnvVar } from "src/client/configs/ClientEnvVar";
import { ProjectPreviewVM } from "src/client/domain/migration/MigraionPreviewVM";
import { RootState } from "src/client/reducer";
import { ScrollUtil } from "src/client/utils/ScrollUtil";
import { TabPanel } from "src/client/components/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Tab,
  Tabs,
  TextField,
  Zoom,
} from "@material-ui/core";

interface ImportProjectFABProp {
  display: boolean;
  disable: boolean;
}

export const ImportProjectFAB: React.FC<ImportProjectFABProp> = (
  props = {
    display: true,
    disable: false,
  }
) => {
  const dispatch = useDispatch();
  const name = "import-project-btn";
  const display = props.display;
  const disable = props.disable;
  const classname = clsx(["fab", name, display ? "" : "hidden"]);

  const handleOpenDialog = () => {
    dispatch(DataMigrationSlice.showImportProjectDialog(true));
  };

  return (
    <React.Fragment>
      <Zoom in={display} timeout={1000}>
        <Fab
          className={classname}
          disabled={disable}
          onClick={handleOpenDialog}
        >
          <CloudUploadIcon />
        </Fab>
      </Zoom>
      <ImportProjectDialog />
    </React.Fragment>
  );
};

// TODO rewrite use store
const getConnectionParams = () => {
  const conn = (document.querySelector("form #conn-string") as HTMLInputElement)
    ?.value;
  const version = (document.querySelector(
    'select[name="version"]'
  ) as HTMLInputElement)?.value;
  const dbname = (document.querySelector("form #dbname") as HTMLInputElement)
    ?.value;
  const params = {
    conn,
    dbname,
    version,
  };

  return params;
};

interface ImportProjectForm {}

interface ImportProjectDialogProp {}

const ImportProjectDialog: React.FC<ImportProjectDialogProp> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const name = "import-project-dialog";
  const form_id = "import-project-form";

  const classname = clsx([name]);

  const { show } = useSelector((state: RootState) => {
    return {
      show: state.migration.import_project_dialog.show,
    };
  });

  const { project } = useSelector((state: RootState) => {
    const target = state.migration.project_selected;

    const item = !state.migration.projects
      ? null
      : state.migration.projects.find((item) => {
          return item.projectCode == target ? item : undefined;
        });

    return { project: item };
  });

  const handleCloseDialog = () => {
    dispatch(DataMigrationSlice.showImportProjectDialog(false));
  };

  const { register, handleSubmit, errors } = useForm<ImportProjectForm>({
    mode: "onChange",
  });

  const onSubmit = (form: ImportProjectForm) => {
    console.log("submit");

    // TODO use origin
    // const origin = AxiosUtil.getOriginWithPort();
    const origin = "http://192.168.128.20:8000";
    const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

    console.log(form);

    // TODO form store
    const code = (document.querySelector(
      "input[name=project_code]"
    ) as HTMLInputElement)?.value;

    const params = getConnectionParams();

    const body = {
      //   version: params.version,
      //   conn: params.conn,
      //   code: code,
    };
    // const pid = "MjnQ";
    const url = `/api/migration/projects/${code}`;

    client
      .post<any>(url, body, { params })
      .then((res) => {
        // console.log(res.data);
        dispatch(DataMigrationSlice.showImportProjectDialog(false));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(FetchSlice.end());
      });
  };

  const handleImportProject = () => handleSubmit(onSubmit)();

  return (
    <Dialog
      aria-labelledby={name}
      className={classname}
      open={show}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth={false}
    >
      <DialogTitle>{"Import Project"}</DialogTitle>
      <DialogContent>
        <form id={form_id} onSubmit={handleSubmit(onSubmit)} noValidate>
          <input hidden={true} />
          <Grid container direction="column">
            {/* <Grid item>{"TODO Select Exist Project"}</Grid> */}
            {project && (
              <Grid>
                <Grid item>
                  <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    size="small"
                    defaultValue={project.projectName}
                    disabled={true}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Display Name"
                    name="display_name"
                    variant="outlined"
                    size="small"
                    defaultValue={project.displayName}
                    disabled={true}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Project Code"
                    name="project_code"
                    variant="outlined"
                    size="small"
                    defaultValue={project.projectCode}
                    autoFocus={true}
                    fullWidth={true}
                    // inputRef={register({
                    //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                    // })}
                    // error={!!errors.name}
                  />
                </Grid>

                {/* <Grid item>{project.cloudCode}</Grid> */}
              </Grid>
            )}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button className={"import"} onClick={handleImportProject}>
          {"import"}
        </Button>
        <Button className={"cancel"} onClick={handleCloseDialog}>
          {"Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
