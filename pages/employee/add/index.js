import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import NewUserForm from "../../../components/user/UserForm";
import { addUser } from "../../../store/user-slice";
import classes from "./add.module.css";

function NewUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  async function addUserHandler(userData, callback) {
    try {
      dispatch(
        addUser(userData, () => {
          if (callback) callback();
        })
      );
    } catch (error) {
      console.error(`error in addUserHandler`, error);
    }
  }

  return (
    <div className={classes["add-emp"]}>
      <div className={classes["list-view"]}>
        <Button data-testid="Listbtn" onClick={() => router.push("/employee/list")} variant="primary">
          List View
        </Button>
      </div>
      <NewUserForm onHandleUser={addUserHandler} isUpdate={false} />
    </div>
  );
}

export default NewUser;
