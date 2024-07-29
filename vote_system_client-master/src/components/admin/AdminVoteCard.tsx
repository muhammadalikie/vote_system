import {VoteCartType} from "../../types/vote.ts";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AdminVoteCartDialog from "./AdminVoteCartDialog.tsx";
import {useState} from "react";
import moment from "jalali-moment";
import {dateGregorianToJalali} from "../../utils.ts";
import CustomDialog from "../core/CustomDialog.tsx";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {deleteVoteCart} from "../../features/voteSlice.ts";

export default function AdminVoteCard({voteCart}: { voteCart: VoteCartType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isVoteCartDialogOpen, setIsVoteCartDialogOpen] = useState<boolean>(false);
  const [isDeleteVoteCartDialogOpen, setIsDeleteVoteCartDialogOpen] = useState<boolean>(false);

  const handleDeleteVoteCartDialogClose = (result: boolean) => {
    setIsDeleteVoteCartDialogOpen(false);
    if (result) {
      dispatch(deleteVoteCart(voteCart.id))
    }
  }

  return (
    <Card sx={{padding: 1}}>
      <AdminVoteCartDialog
        isOpen={isVoteCartDialogOpen}
        setIsOpen={setIsVoteCartDialogOpen}
        isEdit={true}
        initFormData={
          {
            id: voteCart.id,
            name: voteCart.name,
            start_date: moment(voteCart.start_date),
            end_date: moment(voteCart.end_date),
            vote_count: voteCart.vote_count,
            requirements: voteCart.requirements,
            description: voteCart.description
          }
        }
      />
      <CustomDialog
        isOpen={isDeleteVoteCartDialogOpen}
        onCloseCallback={handleDeleteVoteCartDialogClose}
        title="حذف نظرسنجی"
        content="آیا از حذف این نظرسنجی اطمینان دارید؟"/>
      <CardContent>
        <h3 className="text-xl mb-8">{voteCart.name}</h3>
        <p className="text-gray-500 text-sm mb-3">شروع: {dateGregorianToJalali(voteCart.start_date.toString())}</p>
        <p className="text-gray-500 text-sm">پایان: {dateGregorianToJalali(voteCart.end_date.toString())}</p>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => navigate(`/admin/vote_carts/${voteCart.id}`)}>مشاهده</Button>
        <Button color="warning" onClick={() => setIsVoteCartDialogOpen(true)}>ویرایش</Button>
        <Button color="error" onClick={() => setIsDeleteVoteCartDialogOpen(true)}>حذف</Button>
      </CardActions>
    </Card>
  )
}