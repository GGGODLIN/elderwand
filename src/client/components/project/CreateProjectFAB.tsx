import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import FetchSlice from "src/client/slices/FetchSlice";
import kws from "src/client/configs/Keywords";
import ProjectSlice from "../../slices/ProjectSlice";
import React, { ChangeEvent, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { AxiosUtil } from "src/client/utils/AxiosUtil";
import { ClientEnvVar } from "src/client/configs/ClientEnvVar";
import { CloudCodeEnum } from "../../configs/Enum";
import { RootState } from "src/client/reducer";
import { TimeUtil } from "src/client/utils/TimeUtil";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { UserVM } from "src/client/domain/user/UserVM";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
  Zoom,
} from "@material-ui/core";

export const CreateProjectFAB: React.FC<any> = () => {
  const dispatch = useDispatch();
  const name = "create-project-btn";

  const display = true;
  const classname = clsx(["fab", name, display ? "" : "hidden"]);

  const handleOpenDialog = () => {
    dispatch(ProjectSlice.showCreateDialog(true));
  };

  return (
    <React.Fragment>
      <Zoom in={display} timeout={1000}>
        <Fab className={classname} onClick={handleOpenDialog}>
          <AddIcon />
        </Fab>
      </Zoom>
      <CreateProjectDialog />
    </React.Fragment>
  );
};

interface CreateProjectForm {
  name: string;
  cloud_code_id: string;
  expire_date: string;
  // code: string;
}

interface SelectOption {
  name: string;
  value: any;
  display?: boolean;
  disabled?: boolean;
}

const options: SelectOption[] = [
  { name: "Select...", value: "", display: false },
  { name: "Black Hole", value: CloudCodeEnum.BlackHole },
  { name: "AliLiving", value: CloudCodeEnum.AliLiving },
  { name: "Tencent", value: CloudCodeEnum.Tencent },
  { name: "Huawai", value: CloudCodeEnum.Huawai },
  { name: "AWS", value: CloudCodeEnum.AWS },
  { name: "Azure", value: CloudCodeEnum.Azure },
  { name: "GoogleCloud", value: CloudCodeEnum.GoogleCloud },
  { name: "Jinmao", value: CloudCodeEnum.Jinmao },
  // TODO from server
];

const SelectOptions: React.FC<{ options: SelectOption[] }> = (props) => {
  const items = props.options.map((item, idx) => {
    return (
      <option
        key={idx}
        value={`${item.value}`}
        disabled={item?.disabled}
        style={{ display: `${!item.display ? "block" : "none"}` }}
      >
        {item.name}
      </option>
    );
  });

  return <React.Fragment>{items}</React.Fragment>;
};

const TimeFormat = "YYYY-MM-DD";

export const CreateProjectDialog: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const name = "create-project-dialog";
  const form_id = "create-project-form";

  const { show } = useSelector(
    (state: RootState) => state.project.create_dialog
  );

  const classname = clsx([name]);

  const onSubmit = (form: CreateProjectForm) => {
    const origin = AxiosUtil.getOriginWithPort();
    const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

    const body = {
      name: form.name,
      cloud_code_id: parseInt(form.cloud_code_id),
      expire_date: TimeUtil.parse(form.expire_date, TimeFormat).valueOf(),
    };

    console.log(body);

    client
      .post<{ user: UserVM; token: string }>("/api/projects", body)
      .then((res: AxiosResponse<any>) => {
        dispatch(ProjectSlice.showCreateDialog(false));
        dispatch(ProjectSlice.refresh());
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
        if (err.isAxiosError) {
          console.log(err.response.data);
        }
        AxiosUtil.redirectUnAuthorization(err);
        dispatch(FetchSlice.fail({ error: err.message }));
      })
      .finally(() => {
        dispatch(FetchSlice.end());
      });
  };

  const { register, handleSubmit, errors } = useForm<CreateProjectForm>({
    mode: "onChange",
  });

  const handleCreateProject = () => handleSubmit(onSubmit)();

  const handleErrorMessage = (error: any) => {
    if (error?.message) {
      return error.message;
    }
    return "";
  };

  const handleCloseDialog = () => {
    dispatch(ProjectSlice.showCreateDialog(false));
  };

  const handleChangeCloudCodeSelect = (
    e: ChangeEvent<{ name: string; value: string }>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(ProjectSlice.changeCreateProjectForm({ name, value }));
  };

  let default_name = "";
  let default_expire = TimeUtil.now().add(3, "M").format(TimeFormat);

  if (ClientEnvVar.IsDev) {
    default_name = `Example Project ${TimeUtil.now().valueOf()}`;
  }

  return (
    <Dialog
      aria-labelledby={name}
      className={classname}
      open={show}
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth={false}
    >
      <DialogTitle>{"Create Project"}</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)} id={form_id}>
          <Grid container direction="column">
            <Grid item>
              <TextField
                label="Project Name"
                name="name"
                variant="outlined"
                size="medium"
                defaultValue={default_name}
                autoFocus={true}
                inputRef={register({
                  required: `${t(kws.ErrorMessage.IsRequired)}`,
                })}
                error={!!errors.name}
              />
            </Grid>

            <Grid item>
              <FormControl
                className={"cloud-code-select"}
                variant="outlined"
                size="medium"
              >
                <InputLabel htmlFor={"cloud-code-select"}>
                  {"Cloud Code"}
                </InputLabel>
                <Select
                  native
                  name={"cloud_code_id"}
                  id={"cloud_code_id"}
                  defaultValue={""}
                  onChange={handleChangeCloudCodeSelect}
                  required
                  inputRef={register({
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                  error={!!errors.cloud_code_id}
                >
                  <SelectOptions options={options} />
                  {/* TODO options from user permission  */}
                </Select>
                <FormHelperText>
                  {handleErrorMessage(errors.cloud_code_id)}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                label="Expire Date"
                name="expire_date"
                type="date"
                variant="outlined"
                defaultValue={default_expire}
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register({
                  required: `${t(kws.ErrorMessage.IsRequired)}`,
                })}
                error={!!errors.expire_date}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button className={"create"} onClick={handleCreateProject}>
          {"Create"}
        </Button>
        <Button className={"cancel"} onClick={handleCloseDialog}>
          {"Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
