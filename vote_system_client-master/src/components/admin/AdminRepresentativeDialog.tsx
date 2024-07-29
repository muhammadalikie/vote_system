import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {EditRepresentativeForm, RepresentativeError, RepresentativeForm} from "../../types/representative.ts";
import {createRepresentative, editRepresentative} from "../../features/representativeSlice.ts";
import {RootState} from "../../store.ts";
import {getStudents} from "../../features/studentSlice.ts";
import {Student} from "../../types/student.ts";
import {getVoteCarts} from "../../features/voteSlice.ts";
import {VoteCartType} from "../../types/vote.ts";

export default function AdminRepresentativeDialog({isOpen, setIsOpen, isEdit, initFormData}: {
  isOpen: boolean,
  setIsOpen: any,
  isEdit: boolean,
  initFormData: EditRepresentativeForm,
}) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {students} = useSelector((state: RootState) => state.student);
  const {voteCarts} = useSelector((state: RootState) => state.vote);
  const [formData, setFormData] = useState<RepresentativeForm>({
    name: initFormData.name,
    student: initFormData.student,
    vote_cart: initFormData.vote_cart,
  });
  const [formErrors, setFormErrors] = useState<RepresentativeError>({
    name: '',
    student: '',
    vote_cart: '',
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getVoteCarts());
  }, []);

  const handleCloseStudentForm = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setFormErrors({
        ...formErrors,
        name: '',
      });
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormErrors({
      ...formErrors,
      [event.target.name]: '',
    })

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
        dispatch(editRepresentative({...formData, id: initFormData.id}))
          .then(() => {
            setIsOpen(false);
          });
      } else {
        dispatch(createRepresentative(formData))
          .then(() => {
            resetForm();
            setIsOpen(false);
          });
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data: RepresentativeForm): RepresentativeError => {
    const errors: RepresentativeError = {
      name: '',
      student: '',
      vote_cart: '',
    };
    if (!data.name) {
      errors.name = 'نام الزامی است';
    }
    if (!data.student) {
      errors.student = 'دانشجو الزامی است';
    }
    if (!data.vote_cart) {
      errors.student = 'نظرسنجی الزامی است';
    }
    return errors;
  };

  const resetForm = () => {
    setFormData({
      name: initFormData.name,
      student: initFormData.student,
      vote_cart: initFormData.vote_cart,
    });
    setFormErrors({
      name: '',
      student: '',
      vote_cart: '',
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
        {isEdit ? "ویرایش نماینده" : "افزودن نماینده"}
      </DialogTitle>
      <DialogContent className="mt-8">
        <form className="flex flex-col gap-5 w-full" noValidate>
          <TextField
            id="name"
            name="name"
            type="text"
            label="نام"
            variant="filled"
            value={formData.name}
            onChange={handleInputChange}
            error={formErrors.name !== ''}
            helperText={formErrors.name}
            required
          />
          <FormControl error={formErrors.student !== ''} required>
            <InputLabel id="student-label">دانشجو</InputLabel>
            <Select
              labelId="student-label"
              id="student"
              name="student"
              value={formData.student.toString()}
              label="دانشجو"
              onChange={handleSelectChange}
            >
              {
                students.map((student: Student) =>
                  <MenuItem key={student.id} value={student.id}>{student.username}</MenuItem>
                )
              }
            </Select>
            <FormHelperText>{formErrors.student}</FormHelperText>
          </FormControl>
          <FormControl error={formErrors.vote_cart !== ''} required>
            <InputLabel id="vote_cart-label">نظرسنجی</InputLabel>
            <Select
              labelId="vote_cart-label"
              id="vote_cart"
              name="vote_cart"
              value={formData.vote_cart.toString()}
              label="نظرسنجی"
              onChange={handleSelectChange}
            >
              {
                voteCarts.map((voteCart: VoteCartType) =>
                  <MenuItem key={voteCart.id} value={voteCart.id}>{voteCart.name}</MenuItem>
                )
              }
            </Select>
            <FormHelperText>{formErrors.vote_cart}</FormHelperText>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleSubmit}>ثبت</Button>
        <Button type="button" color="error" onClick={handleCloseStudentForm}>انصراف</Button>
      </DialogActions>
    </Dialog>
  );
}