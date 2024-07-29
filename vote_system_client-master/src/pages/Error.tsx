import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  return (
    <section className="flex justify-center items-center flex-col mt-48">
      <p className="text-2xl text-gray-500">مشکلی پیش آمده است.</p>
      <Button onClick={() => navigate('/dashboard')} sx={{mt: 5}} type="button" variant="outlined">
        بازگشت به خانه
      </Button>
    </section>
  );
}