import { useNavigate } from "react-router-dom";
import Button from "./Button";

export const ButtonBack = ()=>{
    const navigate = useNavigate()

return    <Button type={"button"} style="back" onClick={() => navigate(-1)}>&larr; Back</Button>
}