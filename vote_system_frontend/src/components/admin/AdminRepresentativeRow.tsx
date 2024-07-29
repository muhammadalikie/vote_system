import {IconButton, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Representative} from "../../types/representative.ts";
import {numLatinToFa} from "../../utils.ts";
import {useState} from "react";
import AdminRepresentativeDialog from "./AdminRepresentativeDialog.tsx";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {deleteRepresentative} from "../../features/representativeSlice.ts";
import CustomDialog from "../core/CustomDialog.tsx";

export default function AdminRepresentativeRow({representative}: { representative: Representative }) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isEditRepresentativeDialogOpen, setIsEditRepresentativeDialogOpen] = useState<boolean>(false);
  const [isDeleteRepresentativeDialogOpen, setIsDeleteRepresentativeDialogOpen] = useState<boolean>(false);

  const handleDeleteRepresentativeDialogClose = (result: boolean) => {
    setIsDeleteRepresentativeDialogOpen(false);
    if (result) {
      dispatch(deleteRepresentative(representative.id))
    }
  }

  return (
    <TableRow>
      <AdminRepresentativeDialog
        isOpen={isEditRepresentativeDialogOpen}
        setIsOpen={setIsEditRepresentativeDialogOpen}
        isEdit={true}
        initFormData={{
          name: representative.name,
          student: representative.student,
          vote_cart: representative.vote_cart,
          id: representative.id
        }}/>
      <CustomDialog
        isOpen={isDeleteRepresentativeDialogOpen}
        onCloseCallback={handleDeleteRepresentativeDialogClose}
        title="حذف نماینده"
        content="آیا از حذف این نماینده اطمینان دارید؟"/>
      <TableCell>{representative.username}</TableCell>
      <TableCell>{representative.name}</TableCell>
      <TableCell>{representative.vote_cart_name}</TableCell>
      <TableCell>{numLatinToFa(representative.number_of_votes.toString())}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => setIsEditRepresentativeDialogOpen(true)} title="ویرایش" color="primary">
          <EditIcon/>
        </IconButton>
        <IconButton onClick={() => setIsDeleteRepresentativeDialogOpen(true)} title="حذف" color="error">
          <DeleteIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}