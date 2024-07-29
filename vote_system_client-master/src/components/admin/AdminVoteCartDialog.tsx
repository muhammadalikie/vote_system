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
import {UpdateVoteCartForm, VoteCartError, VoteCartForm} from "../../types/vote.ts";
import {DateTimePicker} from "@mui/x-date-pickers";
import {createVoteCart, updateVoteCart} from "../../features/voteSlice.ts";
import {Moment} from "moment/moment";

export default function AdminVoteCartDialog({isOpen, setIsOpen, isEdit, initFormData}: {
  isOpen: boolean,
  setIsOpen: any,
  isEdit: boolean,
  initFormData: UpdateVoteCartForm,
}) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [formData, setFormData] = useState<VoteCartForm>({
    name: initFormData.name,
    description: initFormData.description,
    start_date: initFormData.start_date,
    end_date: initFormData.end_date,
    requirements: initFormData.requirements,
    vote_count: initFormData.vote_count
  });
  const [formErrors, setFormErrors] = useState<VoteCartError>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    requirements: '',
    vote_count: ''
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleCloseVoteCartForm = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setFormErrors({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        requirements: '',
        vote_count: ''
      });
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateTimeChange = (key: string, value: string | Moment | null) => {
    if (value !== null) {
      setFormErrors({
        ...formErrors,
        [key]: ''
      });
    }
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.values(errors).every(value => value === '')) {
      if (isEdit) {
        dispatch(updateVoteCart({...formData, id: initFormData.id}))
          .then(() => {
            setIsOpen(false);
          });
      } else {
        dispatch(createVoteCart(formData))
          .then(() => {
            resetForm();
            setIsOpen(false);
          });
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data: VoteCartForm): VoteCartError => {
    const errors: VoteCartError = {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      requirements: '',
      vote_count: ''
    };
    if (!data.name) {
      errors.name = 'نام نظرسنجی الزامی است';
    }
    if (!data.start_date) {
      errors.start_date = 'زمان شروع نظرسنجی الزامی است';
    }
    if (!data.end_date) {
      errors.end_date = 'زمان پایان نظرسنجی الزامی است';
    }
    if (!data.vote_count) {
      errors.vote_count = 'تعداد رای مجاز نظرسنجی الزامی است';
    }
    return errors;
  };

  const resetForm = () => {
    setFormData({
      name: initFormData.name,
      description: initFormData.description,
      start_date: initFormData.start_date,
      end_date: initFormData.end_date,
      requirements: initFormData.requirements,
      vote_count: initFormData.vote_count
    });
    setFormErrors({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      requirements: '',
      vote_count: ''
    });
  };

  return (
    <Dialog
      keepMounted={false}
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleCloseVoteCartForm}
    >
      <DialogTitle className="text-xl md:text-start text-center">
        {isEdit ? "ویرایش نظرسنجی" : "افزودن نظرسنجی"}
      </DialogTitle>
      <DialogContent className="mt-8">
        <form className="flex flex-col sm:grid sm:grid-cols-2 gap-5 w-full" noValidate>
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
            className="col-span-2"
            required
          />
          <DateTimePicker
            value={formData.start_date}
            onChange={(newValue) => handleDateTimeChange("start_date", newValue)}
            label="زمان شروع"
            slotProps={{
              textField: {
                error: formErrors.start_date !== '',
                helperText: formErrors.start_date,
                variant: "filled",
                required: true
              },
            }}
          />
          <DateTimePicker
            value={formData.end_date}
            onChange={(newValue) => handleDateTimeChange("end_date", newValue)}
            label="زمان پایان"
            slotProps={{
              textField: {
                error: formErrors.end_date !== '',
                helperText: formErrors.end_date,
                variant: "filled",
                required: true
              },
            }}
          />
          <TextField
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            id="vote_count"
            name="vote_count"
            type="text"
            label="تعداد رای مجاز"
            variant="filled"
            value={formData.vote_count}
            onChange={handleInputChange}
            error={formErrors.vote_count !== ''}
            helperText={formErrors.vote_count}
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
          <TextField
            id="description"
            name="description"
            type="text"
            label="توضیحات"
            variant="filled"
            value={formData.description}
            onChange={handleInputChange}
            error={formErrors.description !== ''}
            helperText={formErrors.description}
            className="col-span-2"
            rows={4}
            multiline
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleSubmit}>ثبت</Button>
        <Button type="button" color="error" onClick={handleCloseVoteCartForm}>انصراف</Button>
      </DialogActions>
    </Dialog>
  );
}