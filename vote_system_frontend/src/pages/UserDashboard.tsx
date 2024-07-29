import UserNavbar from "../components/user/UserNavbar.tsx";
import {Container} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router-dom";
import Vote from "../components/vote/Vote.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {useEffect} from "react";
import VoteCardList from "../components/vote/VoteCardList.tsx";

export default function UserDashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.is_staff) {
      navigate("/admin", {replace: true});
    }
  }, [user]);

  return (
    <section className="pb-10 px-10">
      <UserNavbar isShowingLogo={true}/>
      <div className="mt-32">
        <Container maxWidth="xl">
          <Routes>
            <Route
              path=""
              element={<VoteCardList/>}
            />
            <Route
              path="/vote_carts/:voteCartId"
              element={<Vote/>}
            />
          </Routes>
        </Container>
      </div>
    </section>
  );
}