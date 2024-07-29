import {dateGregorianToJalali} from "../../utils.ts";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {useParams} from "react-router-dom";
import {RootState} from "../../store.ts";
import {useEffect} from "react";
import {getVoteCart, getVoteCartVotes} from "../../features/voteSlice.ts";
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";
import {VoteCartVote, VoteCount} from "../../types/vote.ts";
import CustomTooltip from "../core/CustomTooltip.tsx";


export default function AdminVoteCart() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {voteCartId} = useParams();
  const {currentVoteCartVotes, currentVoteCart} = useSelector((state: RootState) => state.vote);

  useEffect(() => {
    if (voteCartId) {
      dispatch(getVoteCartVotes(Number(voteCartId)));
      dispatch(getVoteCart(Number(voteCartId)));
    }
  }, [voteCartId]);

  const voteCounts: VoteCount = currentVoteCartVotes.reduce((acc: VoteCount, vote: VoteCartVote) => {
    acc[vote.representative] = (acc[vote.representative] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(voteCounts).map((representative) => ({
    name: representative,
    votes: voteCounts[representative],
  }));

  return (
    <section>
      <h1 className="text-3xl md:mb-8 mb-16 md:text-right text-center">{currentVoteCart.name}</h1>
      <div className="flex md:justify-start justify-between mb-12">
        <p
          className="text-gray-500 md:me-24 me-5">شروع: {dateGregorianToJalali(currentVoteCart?.start_date?.toString())}</p>
        <p
          className="text-gray-500 md:text-right text-left">پایان: {dateGregorianToJalali(currentVoteCart?.end_date?.toString())}</p>
      </div>
      <p className="mb-12 md:text-right text-center">{currentVoteCart.description}</p>
      {
        currentVoteCartVotes.length !== 0 ?
          <div style={{width: '100%', height: 400}}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" tickMargin={10}/>
                <YAxis tickFormatter={(tick) => (Number.isInteger(tick) ? tick : '')} tickMargin={20}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="votes" fill="#8884d8" maxBarSize={100}/>
              </BarChart>
            </ResponsiveContainer>
          </div> :
          <p className="text-center text-gray-500 text-lg mt-20">رای ای داده نشده است.</p>
      }
    </section>
  );
}
