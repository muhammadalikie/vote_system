import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {ReactNode, useEffect} from "react";
import {getUser} from "../../features/authSlice.ts";
import CustomBackdrop from "../core/CustomBackdrop.tsx";

export default function UserLayout({children}: { children: ReactNode }) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {user, authStatus} = useSelector((state: RootState) => state.auth);
  const {voteStatus} = useSelector((state: RootState) => state.vote);
  const {studentStatus} = useSelector((state: RootState) => state.student);
  const {representativeStatus} = useSelector((state: RootState) => state.representative);

  useEffect(() => {
    dispatch(getUser())
  }, []);

  return (
    <div>
      {user && <>
        {children}
      </>
      }
      <CustomBackdrop
        isOpen={user === null || authStatus === "loading" || voteStatus === "loading" || studentStatus === "loading" || representativeStatus === "loading"}/>
    </div>
  );
}