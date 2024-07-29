import {VoteCartType} from "../../types/vote.ts";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {dateGregorianToJalali} from "../../utils.ts";

export default function VoteCard({voteCart}: { voteCart: VoteCartType }) {
  const navigate = useNavigate();

  return (
    <Card sx={{padding: 1}}>
      <CardContent>
        <h3 className="text-xl mb-8">{voteCart.name}</h3>
        <p className="text-gray-500 text-sm mb-3">شروع: {dateGregorianToJalali(voteCart.start_date.toString())}</p>
        <p className="text-gray-500 text-sm">پایان: {dateGregorianToJalali(voteCart.end_date.toString())}</p>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => navigate(`/dashboard/vote_carts/${voteCart.id}`)}>مشاهده</Button>
      </CardActions>
    </Card>
  )
}