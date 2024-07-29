import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, MouseEvent, useState} from "react";
import {UserForm} from "../types/auth.ts";
import {signin} from "../features/authSlice.ts";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import bnut from "../assets/images/bnut.png";

export default function Login() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {authStatus} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<UserForm>({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<UserForm>({
    username: '',
    password: ''
  });

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setFormErrors({
        ...formErrors,
        [event.target.name]: ''
      });
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.values(errors).every(value => value === '')) {
      dispatch(signin(formData)).unwrap()
        .then(() => {
          resetForm();
          navigate("/", {replace: true});
        });
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data: UserForm): UserForm => {
    const errors: UserForm = {
      username: '',
      password: '',
    };
    if (!data.username) {
      errors.username = 'نام کاربری الزامی است';
    }
    if (!data.password) {
      errors.password = 'رمز عبور الزامی است';
    }
    return errors;
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
    });
    setFormErrors({
      username: '',
      password: '',
    });
  }

  return (
    <div className="w-100 my-0 mx-auto">
      <div className="w-100 min-h-screen flex flex-wrap justify-center items-center p-4 bg-blue-100 shadow">
        <div
          className="md:w-192 w-96 bg-white rounded-lg overflow-hidden flex flex-wrap md:justify-between justify-center py-8 md:ps-16 ">
          <form className="form flex flex-col" onSubmit={handleSubmit} noValidate>
            <p className="text-3xl text-black text-center mb-12">ورود</p>
            <TextField
              sx={{marginBottom: 3}}
              id="username"
              name="username"
              type="text"
              label="نام کاربری"
              variant="filled"
              value={formData.username}
              onChange={handleInputChange}
              error={formErrors.username !== ''}
              helperText={formErrors.username}
              required
            />
            <TextField
              sx={{marginBottom: 4}}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={handleMouseDown}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              }}
              label="رمز عبور"
              variant="filled"
              value={formData.password}
              onChange={handleInputChange}
              error={formErrors.password !== ''}
              helperText={formErrors.password}
              required
            />
            <LoadingButton loading={authStatus === "loading"} sx={{borderRadius: "10px", px: 3, fontSize: 17}}
                           variant="contained"
                           type="submit">
              ورود
            </LoadingButton>
          </form>
          <img src={bnut} alt="bnut" className="md:block hidden"/>
        </div>
      </div>
    </div>
  );
}