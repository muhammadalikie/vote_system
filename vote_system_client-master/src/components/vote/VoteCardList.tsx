import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {useEffect} from "react";
import {getVoteCarts} from "../../features/voteSlice.ts";
import {RootState} from "../../store.ts";
import {VoteCartType} from "../../types/vote.ts";
import VoteCard from "./VoteCard.tsx";


export default function VoteCardList() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {voteCarts} = useSelector((state: RootState) => state.vote);

  useEffect(() => {
    dispatch(getVoteCarts())
  }, []);

  return (
    voteCarts.length ?
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-5 mt-20">
        {voteCarts.map((voteCart: VoteCartType) =>
          <VoteCard voteCart={voteCart} key={voteCart.id}/>
        )}
      </div>
      : <h3 className="text-xl text-gray-400 text-center mt-32">هیچ رای گیری وجود ندارد.</h3>
  );
}