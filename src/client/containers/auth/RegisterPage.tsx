import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AuthSlice from "src/client/slices/AuthSlice";
import FetchSlice from "src/client/slices/FetchSlice";
import kws from "src/client/configs/Keywords";
import React, { ChangeEvent, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { AxiosUtil } from "src/client/utils/AxiosUtil";
import { RootState } from "src/client/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { UserVM } from "src/client/domain/user/UserVM";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";

interface RegisterForm {
  id: string;
  account_id: string;
  username: string;
  display_name: string;
  password: string;
  password2: string;
  email: string;
  tel: string;
  address: string;
  company: string;
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

export interface RegisterPageProps {
  title: string;
  query: { token: string };
}

export const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const name = "register";
  const classname = `${name} page`;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onSubmit",
  });

  const { token } = props.query;

  const origin = AxiosUtil.getOriginWithPort();
  const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

  const handleInputChange = (
    e: ChangeEvent<{ name: string; value: string }>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ name, value });

    dispatch(AuthSlice.changeRegisterUserForm({ name, value }));
  };

  const onSubmit = async (form: RegisterForm) => {
    client
      .post("/api/register", form)
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
      });
  };

  const { form } = useSelector((state: RootState) => state.auth.register);

  useEffect(() => {
    if (!token) {
      return;
    }

    const params = { token: token };

    client
      .get("/api/invite/user", { params: params })
      .then((res: AxiosResponse<UserVM>) => {
        console.log(res.data);

        // dispatch(AuthSlice.setInvitingUser({ user: res.data }));
      })
      .catch((err: AxiosError<any>) => {
        console.log(err.message);
      });
  }, [token]);

  return (
    <React.Fragment>
      <div className={classname}>
        <Container className={"register-form-container"} maxWidth={"xs"}>
          <Card className={"register-form-card"}>
            <CardContent>
              <Avatar className="avatar">
                <AccountCircleIcon />
              </Avatar>

              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  // name="id"
                  value={form.id}
                  hidden
                  readOnly
                  {...register("id", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                />
                <input
                  type="text"
                  // name="account_id"
                  value={form.account_id}
                  hidden
                  readOnly
                  {...register("account_id", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                />

                <TextField
                  type="text"
                  // id="username"
                  // name="username"
                  label={t(kws.RegisterPage.Username)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  autoComplete="username"
                  size="small"
                  // onChange={handleInputChange}
                  value={form.username}
                  {...register("username", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                  error={!!errors.username}
                  helperText={handleErrorMessage(errors.username)}
                />

                <TextField
                  type="text"
                  // id="display_name"
                  // name="display_name"
                  label={t(kws.RegisterPage.DisplayName)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="display_name"
                  size="small"
                  // inputRef={register({
                  //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                  // })}
                  defaultValue={form.display_name}
                  // value={form.display_name}
                  {...register("display_name", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                  // onChange={handleInputChange}
                  error={!!errors.display_name}
                  helperText={handleErrorMessage(errors.display_name)}
                />

                <TextField
                  type="password"
                  // id="password"
                  // name="password"
                  label={t(kws.RegisterPage.Password)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  // inputRef={register({
                  //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                  // })}
                  value={form.password}
                  {...register("password", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  helperText={handleErrorMessage(errors.password)}
                />

                <TextField
                  type="password"
                  // id="password2"
                  // name="password2"
                  label={t(kws.RegisterPage.ConfirmPassword)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  // onChange={handleInputChange}
                  // inputRef={register({
                  //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                  // })}
                  value={form.password2}
                  {...register("password2", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  helperText={handleErrorMessage(errors.password)}
                />

                <TextField
                  type="text"
                  id="email"
                  name="email"
                  label={t(kws.LoginPage.EmailAddress)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  autoComplete="email"
                  // inputRef={register({
                  //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                  //   pattern: {
                  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //     message: `${t(kws.ErrorMessage.InvalidEmailAddress)}`,
                  //   },
                  // })}
                  value={form.email}
                  {...register("email", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: `${t(kws.ErrorMessage.InvalidEmailAddress)}`,
                    },
                  })}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={handleErrorMessage(errors.email)}
                />

                <TextField
                  type="text"
                  // id="address"
                  // name="address"
                  label={t(kws.RegisterPage.Address)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="address"
                  size="small"
                  // value={form.address}
                  // onChange={handleInputChange}
                  // inputRef={register({
                  //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                  // })}
                  value={form.address}
                  {...register("address", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                  // onChange={handleInputChange}
                  error={!!errors.display_name}
                  helperText={handleErrorMessage(errors.address)}
                />

                <TextField
                  type="text"
                  // id="tel"
                  // name="tel"
                  label={t(kws.RegisterPage.PhoneNumber)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  // inputRef={register({
                  //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                  // })}
                  value={form.tel}
                  {...register("tel", {
                    required: `${t(kws.ErrorMessage.IsRequired)}`,
                  })}
                  // onChange={handleInputChange}
                  error={!!errors.tel}
                  helperText={handleErrorMessage(errors.tel)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={handleSubmitLock(errors)}
                >
                  {t(kws.RegisterPage.Register)}
                </Button>

                <Grid container className={"other-action"}>
                  <Grid item xs>
                    <Link href="/login" variant="body2">
                      {t(kws.RegisterPage.AlreadyHaveAnAccount)}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/password/reset" variant="body2">
                      {t(kws.RegisterPage.ForgotPassword) + " ?"}
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
