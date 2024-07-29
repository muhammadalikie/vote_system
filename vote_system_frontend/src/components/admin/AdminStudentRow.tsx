import {IconButton, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Student} from "../../types/student.ts";
import {useState} from "react";
import AdminStudentDialog from "./AdminStudentDialog.tsx";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {deleteStudent} from "../../features/studentSlice.ts";
import CustomDialog from "../core/CustomDialog.tsx";

export default function AdminStudentRow({student}: { student: Student }) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isEditStudentDialogOpen, setIsEditStudentDialogOpen] = useState<boolean>(false);
  const [isDeleteStudentDialogOpen, setIsDeleteStudentDialogOpen] = useState<boolean>(false);

  const handleDeleteStudentDialogClose = (result: boolean) => {
    setIsDeleteStudentDialogOpen(false);
    if (result) {
      dispatch(deleteStudent(student.id))
    }
  }

  return (
    <TableRow>
      <AdminStudentDialog
        isOpen={isEditStudentDialogOpen}
        setIsOpen={setIsEditStudentDialogOpen}
        isEdit={true}
        initFormData={{...student, password: ''}}/>
      <CustomDialog
        isOpen={isDeleteStudentDialogOpen}
        onCloseCallback={handleDeleteStudentDialogClose}
        title="حذف دانشجو"
        content="آیا از حذف این دانشجو اطمینان دارید؟"/>
      <TableCell>{student.username}</TableCell>
      <TableCell>{student.requirements}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => setIsEditStudentDialogOpen(true)} title="ویرایش" color="primary">
          <EditIcon/>
        </IconButton>
        <IconButton onClick={() => setIsDeleteStudentDialogOpen(true)} title="حذف" color="error">
          <DeleteIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}