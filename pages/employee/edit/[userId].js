import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import UserForm from "../../../components/user/UserForm";
import { updateUserData, findUser } from "../../../store/user-slice";
import classes from "./edit.module.css";
import { wrapper } from "../../../store/store";

const EditUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  async function updateUserHandler(userData, callback) {
    try {
      dispatch(
        updateUserData(userData, () => {
          if (callback) callback();
        })
      );
    } catch (error) {
      console.error(`error in updateUserHandler`, error);
    }
  }

  useEffect(() => {
    if (!router.isReady) return;

    const userId = router.query.userId;
    if (!userId) {
      throw new Error("userId id should be available");
    }
    dispatch(findUser(userId));
  }, [dispatch, router.isReady, router.query]);

  return (
    <div className={classes["edit-emp"]}>
      <div className={classes["list-view"]}>
        <Button onClick={() => router.push("/employee/list")} variant="primary">
          List View
        </Button>
      </div>
      <UserForm
        onHandleUser={updateUserHandler}
        isUpdate={true}
        userId={router.query.userId}
      />
    </div>
  );
};
export default EditUser;
