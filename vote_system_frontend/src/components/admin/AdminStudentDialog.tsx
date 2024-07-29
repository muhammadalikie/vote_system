import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {ChangeEvent, MouseEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {EditStudentForm, StudentForm} from "../../types/student.ts";
import {createStudent, editStudent} from "../../features/studentSlice.ts";

export default function AdminStudentDialog({isOpen, setIsOpen, isEdit, initFormData}: {
  isOpen: boolean,
  setIsOpen: any,
  isEdit: boolean,
  initFormData: EditStudentForm,
}) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [formData, setFormData] = useState<StudentForm>({
    username: initFormData.username,
    password: initFormData.password,
    requirements: initFormData.requirements,
  });
  const [formErrors, setFormErrors] = useState<StudentForm>({
    username: '',
    password: '',
    requirements: '',
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleCloseStudentForm = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setFormErrors({
        username: '',
        password: '',
        requirements: '',
      });
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.values(errors).every(value => value === '')) {
      if (isEdit) {
        dispatch(editStudent({...formData, id: initFormData.id}))
          .then(() => {
            setIsOpen(false);
          });
      } else {
        dispatch(createStudent(formData))
          .then(() => {
            resetForm();
            setIsOpen(false);
          });
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data: StudentForm): StudentForm => {
    const errors: StudentForm = {
      username: '',
      password: '',
      requirements: '',
    };
    if (!data.username) {
      errors.username = 'نام کاربری الزامی است';
    }
    if (!data.password) {
      errors.username = 'رمزعبور الزامی است';
    }
    return errors;
  };

  const resetForm = () => {
    setFormData({
      username: initFormData.username,
      password: initFormData.password,
      requirements: initFormData.requirements,
    });
    setFormErrors({
      username: '',
      password: '',
      requirements: '',
    });
  };

  return (
    <Dialog
      keepMounted={false}
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleCloseStudentForm}
    >
      <DialogTitle className="text-xl md:text-start text-center">
        {isEdit ? "ویرایش دانشجو" : "افزودن دانشجو"}
      </DialogTitle>
      <DialogContent className="mt-8">
        <form className="flex flex-col gap-5 w-full" noValidate>
          <TextField
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
            id="password"
            name="password"
            type="text"
            label="رمزعبور"
            variant="filled"
            value={formData.password}
            onChange={handleInputChange}
            error={formErrors.password !== ''}
            helperText={formErrors.password}
            required
          />
          <TextField
            id="requirements"
            name="requirements"
            type="text"
            label="نیازمندی ها"
            variant="filled"
            value={formData.requirements}
            onChange={handleInputChange}
            error={formErrors.requirements !== ''}
            helperText={formErrors.requirements}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleSubmit}>ثبت</Button>
        <Button type="button" color="error" onClick={handleCloseStudentForm}>انصراف</Button>
      </DialogActions>
    </Dialog>
  );
}