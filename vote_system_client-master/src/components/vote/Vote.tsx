import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {deleteVoteCartVote, getVoteCart, getVoteCartVotes, createVoteCartVotes} from "../../features/voteSlice.ts";
import {useParams} from "react-router-dom";
import {RootState} from "../../store.ts";
import {Button, FormControl, FormControlLabel, FormLabel, Checkbox} from "@mui/material";
import {dateGregorianToJalali} from "../../utils.ts";

export default function Vote() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {voteCartId} = useParams();
  const {currentVoteCartVotes, currentVoteCart} = useSelector((state: RootState) => state.vote);
  const [formValue, setFormValue] = useState<string[]>([]);

  useEffect(() => {
    if (voteCartId) {
      dispatch(getVoteCartVotes(Number(voteCartId)));
      dispatch(getVoteCart(Number(voteCartId)));
    }
  }, [voteCartId]);

  useEffect(() => {
    if (currentVoteCartVotes.length > 0 && currentVoteCart?.representative_set?.length > 0) {
      const votedRepresentatives = currentVoteCartVotes.map(vote => vote.representative);
      const votedIds = currentVoteCart.representative_set
        .filter(rep => votedRepresentatives.includes(rep.username))
        .map(rep => rep.id.toString());
      setFormValue(votedIds);
    }
  }, [currentVoteCartVotes, currentVoteCart]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newFormValue = formValue;
    if (formValue.length > 0) {
      for (const repId of formValue) {
        for (const representative of currentVoteCart.representative_set) {
          if (representative.id === Number(repId)) {
            for (const voteCartVote of currentVoteCartVotes) {
              if (representative.username === voteCartVote.representative) {
                newFormValue = newFormValue.filter(item => item !== repId);
              }
            }
          }
        }
      }
    }
    if (newFormValue.length > 0) {
      newFormValue.forEach(repId =>
        dispatch(createVoteCartVotes({voteCartId: Number(voteCartId), representative: repId}))
          .then(() => {
            dispatch(getVoteCartVotes(Number(voteCartId)));
          })
      );
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const repId = event.target.value;
    setFormValue(prevState =>
      prevState.includes(repId)
        ? prevState.filter(id => id !== repId)
        : [...prevState, repId]
    );
  };

  const getVoteDate = (representativeUsername: string): string => {
    const vote = currentVoteCartVotes.find(voteCartVote => voteCartVote.representative === representativeUsername);
    return vote ? vote.date : '';
  };

  const handleDeleteVotes = () => {
    if (currentVoteCartVotes.length > 0) {
      for (const voteCartVote of currentVoteCartVotes) {
        dispatch(deleteVoteCartVote({voteCartId: Number(voteCartId), voteId: voteCartVote.id}))
          .finally(() => {
            setFormValue([])
            dispatch(getVoteCartVotes(Number(voteCartId)));
          })
      }
    }
  }

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
      {currentVoteCart?.representative_set?.length > 0 ? (
        <form onSubmit={handleSubmit} className="sm:block flex justify-center">
          <FormControl>
            <FormLabel id="demo-checkbox-group-label" className="mb-4">نمایندگان</FormLabel>
            <div className="flex flex-col">
              {currentVoteCart.representative_set.map((representative) => (
                <FormControlLabel
                  key={representative.id}
                  control={
                    <Checkbox
                      checked={formValue.includes(representative.id.toString())}
                      onChange={handleCheckboxChange}
                      value={representative.id.toString()}
                    />
                  }
                  label={representative.name}
                  title={getVoteDate(representative.username)}
                />
              ))}
            </div>
            <div className="flex mt-4">
              <Button sx={{mr: 3}} type="submit" variant="contained">
                ثبت
              </Button>
              <Button onClick={handleDeleteVotes} type="button" variant="outlined" color="error">
                حذف همه
              </Button>
            </div>
          </FormControl>
        </form>
      ) : (
        <h3 className="text-xl text-gray-400 text-center mt-32">هیچ نماینده ای وجود ندارد.</h3>
      )}
    </section>
  );
}
