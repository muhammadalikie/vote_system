import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {getRepresentatives} from "../../features/representativeSlice.ts";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import {Representative} from "../../types/representative.ts";
import AdminRepresentativeRow from "./AdminRepresentativeRow.tsx";
import AdminRepresentativeDialog from "./AdminRepresentativeDialog.tsx";
import {getVoteCarts} from "../../features/voteSlice.ts";
import {VoteCartType} from "../../types/vote.ts";

export default function AdminRepresentatives() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {representatives} = useSelector((state: RootState) => state.representative);
  const {voteCarts} = useSelector((state: RootState) => state.vote);
  const [isRepresentativeDialogOpen, setIsRepresentativeDialogOpen] = useState<boolean>(false);
  const [voteCartFilter, setVoteCartFilter] = useState<string>('');

  useEffect(() => {
    dispatch(getRepresentatives());
    dispatch(getVoteCarts());
  }, []);

  const handleVoteCartFilterChange = (event: SelectChangeEvent) => {
    setVoteCartFilter(event.target.value);
  };

  const filteredRepresentatives = voteCartFilter
    ? representatives.filter(representative => representative.vote_cart_name === voteCartFilter)
    : representatives;

  return (
    <section>
      <AdminRepresentativeDialog
        isOpen={isRepresentativeDialogOpen}
        setIsOpen={setIsRepresentativeDialogOpen}
        isEdit={false}
        initFormData={{name: '', student: -1, vote_cart: -1, id: -1}}/>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl">نمایندگان</h1>
        <Button onClick={() => setIsRepresentativeDialogOpen(true)} variant="contained">افزودن نماینده</Button>
      </div>
      <div className="flex items-center mb-10">
        <span className="me-5">فیلتر بر اساس نظرسنجی:</span>
        <Select
          value={voteCartFilter}
          onChange={handleVoteCartFilterChange}
          displayEmpty
          className="min-w-32"
        >
          <MenuItem value="">همه</MenuItem>
          {
            voteCarts.map((voteCart: VoteCartType) =>
              <MenuItem key={voteCart.id} value={voteCart.name}>{voteCart.name}</MenuItem>
            )
          }
        </Select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام کاربری</TableCell>
              <TableCell>نام</TableCell>
              <TableCell>نظرسنجی</TableCell>
              <TableCell>تعداد رای</TableCell>
              <TableCell align="center">اقدامات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRepresentatives.map((representative: Representative) => (
              <AdminRepresentativeRow representative={representative} key={representative.id}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
