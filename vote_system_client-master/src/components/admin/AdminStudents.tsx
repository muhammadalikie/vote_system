import {useEffect, useState} from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../store.ts';
import {getStudents} from '../../features/studentSlice.ts';
import AdminStudentDialog from "./AdminStudentDialog.tsx";
import AdminStudentRow from "./AdminStudentRow.tsx";
import {Student} from "../../types/student.ts";

export default function AdminStudents() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {students} = useSelector((state: RootState) => state.student);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState<boolean>(false);


  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <section>
      <AdminStudentDialog
        isOpen={isStudentDialogOpen}
        setIsOpen={setIsStudentDialogOpen}
        isEdit={false}
        initFormData={{id: -1, username: '', password: '', requirements: ''}}/>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl">دانشجوها</h1>
        <Button onClick={() => setIsStudentDialogOpen(true)} variant="contained">افزودن دانشجو</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام کاربری</TableCell>
              <TableCell>نیازمندی‌ها</TableCell>
              <TableCell align="center">اقدامات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student: Student) => (
              <AdminStudentRow student={student} key={student.id}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
