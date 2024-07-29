import UserNavbar from "../components/user/UserNavbar.tsx";
import {Container} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AdminDrawer from "../components/admin/AdminDrawer.tsx";
import {DrawerItem} from "../types/global.ts";
import AdminVoteCarts from "../components/admin/AdminVoteCarts.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import AdminVoteCart from "../components/admin/AdminVoteCart.tsx";
import AdminStudents from "../components/admin/AdminStudents.tsx";
import AdminRepresentatives from "../components/admin/AdminRepresentatives.tsx";

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate()
  const {user} = useSelector((state: RootState) => state.auth);
  const items: DrawerItem[] = [
    {name: "نظرسنجی ها", path: "/admin"},
    {name: "دانشجوها", path: "/admin/students"},
    {name: "نمایندگان", path: "/admin/representatives"},
  ]

  useEffect(() => {
    if (user) {
      if (!user.is_staff) {
        navigate("/dashboard", {replace: true});
      }
    }
  }, [user]);

  return (
    <section className="pb-10 px-10">
      <UserNavbar isShowingLogo={false} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <div className="mt-32">
        <Container maxWidth="xl">
          <AdminDrawer items={items} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
          <div className="sm:ms-64 ms-0">
            <Routes>
              <Route
                path=""
                element={<AdminVoteCarts/>}
              />
              <Route
                path="/vote_carts/:voteCartId"
                element={<AdminVoteCart/>}
              />
              <Route
                path="/students"
                element={<AdminStudents/>}
              />
              <Route
                path="/representatives"
                element={<AdminRepresentatives/>}
              />
            </Routes>
          </div>
        </Container>
      </div>
    </section>
  );

}