import * as React from "react";
import FetchSlice from "src/client/slices/FetchSlice";
import kws from "src/client/configs/Keywords";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { AxiosError, AxiosResponse } from "axios";
import { AxiosUtil } from "src/client/utils/AxiosUtil";
import { ClientEnvVar } from "src/client/configs/ClientEnvVar";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

interface LoginForm {
  email: string;
  username: string;
  password: string;
  remember: boolean;
}

const handleErrorMessage = (error: any) => {
  if (error?.message) {
    return error.message;
  }
  return "";
};

const handleSubmitLock = (errors: any): boolean => {
  return Object.keys(errors).length > 0;
};
export interface LoginPageProps {
  title: string;
}

export const LoginPage: React.FC<LoginPageProps> = (props) => {
  const name = "login";
  const classname = `${name} page`;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "all",
    defaultValues: {},
  });

  const origin = AxiosUtil.getOriginWithPort();
  const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

  const onSubmit = async (form: LoginForm) => {
    console.log(form);

    client
      .post("/api/login", form)
      .then((res: AxiosResponse<any>) => {
        if (200 <= res.status && res.status < 300) {
          window.location.replace("/admin");
          return;
        }
        console.log(res.data);
      })
      .catch((err: AxiosError<any>) => {
        console.error(err.message);
        dispatch(FetchSlice.end());
      })
      .finally(() => {});
  };

  let username = "";
  let password = "";

  if (ClientEnvVar.IsDev) {
    username = "skymap_admin";
    password = "password";
  }

  return (
    <React.Fragment>
      <div className={classname}>
        <Container className={"login-form-container"} maxWidth={"xs"}>
          <Card className={"login-form-card"}>
            <CardContent>
              <Avatar className="avatar">
                <LockOutlinedIcon />
              </Avatar>

              <Typography className="title">
                {t(kws.LoginPage.Login)}
              </Typography>

              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  type="text"
                  label={t(kws.LoginPage.Username)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  size="medium"
                  autoComplete="username"
                  defaultValue={username}
                  // {...register("username", {
                  //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                  // })}
                  error={!!errors.username}
                  helperText={handleErrorMessage(errors.username)}
                />

                <TextField
                  type="password"
                  label={t(kws.LoginPage.Password)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="medium"
                  defaultValue={password}
                  // {...register("password", {
                  //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                  // })}
                  error={!!errors.password}
                  helperText={handleErrorMessage(errors.password)}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={t(kws.LoginPage.RememberMe)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={handleSubmitLock(errors)}
                >
                  {t(kws.LoginPage.Login)}
                </Button>

                <Grid container className={"other-action"}>
                  <Grid item xs>
                    <Link href="/register" variant="body2">
                      {t(kws.LoginPage.DoNotHaveAnAccount)}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/password/reset" variant="body2">
                      {t(kws.LoginPage.ForgotPassword) + " ?"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
