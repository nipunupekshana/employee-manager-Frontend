import { MdOutlineDeleteForever } from "react-icons/md";
import {FaUserCheck} from "react-icons/fa";
import Card from "../ui/Card";
import classes from "./UserItem.module.css";
import { useRouter } from "next/router";

function UserItem(props) {
  const router = useRouter();
  function deleteUserHandler() {
    props.onDelete(props._id)
  }
  return (
    <Card isItem={true} className={classes.item}>
        <div className={classes.image}>
          {props.photo && <img src={props.photo} alt={props.name} />}
        </div>
        <hr/>
        <div className={classes.content}>
          <h2>
            {props.first_name} {props.last_name}
          </h2>
          <h2>{props.email}</h2>
          <h2>{props.number}</h2>
          <h2>{props.gender == "m" ? "Male" : "Female"}</h2>
        </div>
        <div className={classes.actions}>
          <button onClick={deleteUserHandler}>
            <MdOutlineDeleteForever />
          </button>
          <button onClick={()=> router.push(`/employee/edit/${props._id}`)}>
            <FaUserCheck />
          </button>
        </div>
      </Card>
  );
}

export default UserItem;
