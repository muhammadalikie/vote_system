import {Button} from "@mui/material";
import {VoteCartType} from "../../types/vote.ts";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {useEffect, useState} from "react";
import {getVoteCarts} from "../../features/voteSlice.ts";
import AdminVoteCard from "./AdminVoteCard.tsx";
import AdminVoteCartDialog from "./AdminVoteCartDialog.tsx";

export default function AdminVoteCarts() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {voteCarts} = useSelector((state: RootState) => state.vote);
  const [isVoteCartDialogOpen, setIsVoteCartDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getVoteCarts())
  }, []);

  return (
    <section>
      <AdminVoteCartDialog
        isOpen={isVoteCartDialogOpen}
        setIsOpen={setIsVoteCartDialogOpen}
        isEdit={false}
        initFormData={{
          name: '',
          description: '',
          start_date: null,
          end_date: null,
          requirements: '',
          vote_count: 1,
          id: -1
        }}/>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl">نظرسنجی ها</h1>
        <Button onClick={() => setIsVoteCartDialogOpen(true)} variant="contained">افزودن نظرسنجی</Button>
      </div>
      {
        voteCarts.length ?
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-20">
            {voteCarts.map((voteCart: VoteCartType) =>
              <AdminVoteCard voteCart={voteCart} key={voteCart.id}/>
            )}
          </div>
          : <h3 className="text-xl text-gray-400 text-center mt-32">هیچ رای گیری وجود ندارد.</h3>
      }
    </section>
  );
}