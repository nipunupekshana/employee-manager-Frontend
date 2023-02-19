import { useSelector } from "react-redux";
import UserItem from "./UserItem";
import { MdOutlineDeleteForever } from "react-icons/md";
import classes from "./UsersListTable.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../components/Custom/modal";
import { fetchUsers, removeUser } from "../../store/user-slice";
import { useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { Button, Row } from "react-bootstrap";

function UsersList(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {filteredUsers,users,userLoading } = useSelector((state) => state.user);
  const [filteredEmployees, setFilteredEmployees] = useState(users);
  const [deleteId, setDeleteId] = useState(null);


  // fetch users when component is mounted
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // when search is done, filteredUsers will be updated
  useEffect(() => {
    if(filteredUsers.length > 0)
    setFilteredEmployees(filteredUsers);
    else
    setFilteredEmployees(users);
  }, [filteredUsers, users]);
  
  const deleteUserHandler = (userId) => {
    setDeleteId(userId);
  };

  const handleConfirmDelete = () => {
    dispatch(
      removeUser(deleteId, () => {
        setDeleteId(null);
      })
    );
  };
  const handleCancelDelete = () => {
    setDeleteId(null);
  };
  const editUserHandler = (userId) => {
    router.push(`/employee/edit/${userId}`);
  };

  return (
    <>
      <ConfirmationModal
        title="Delete User"
        body="Are you sure you want to delete this user?"
        confirmText="Delete"
        cancelText="Cancel"
        show={deleteId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        disabled={userLoading}
      />
      {!filteredEmployees.length && !userLoading && <p>No users found.</p>}
      {props.isList == true && !userLoading && filteredEmployees ? (
        <Row className={classes["center-items"]}>
          {filteredEmployees.map((user) => (
            <UserItem
              key={user._id}
              _id={user._id}
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
              number={user.number}
              photo={user.photo}
              gender={user.gender}
              onDelete={deleteUserHandler}
            />
          ))}
        </Row>
      ) : (
        <div className={classes["table-size"]}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img src={user.photo} alt={user.first_name} />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.gender == "m" ? "Male" : "Female"}</td>
                  <td>
                    <div className={classes.actions}>
                      <Button
                        onClick={() => editUserHandler(user._id)}
                        variant="secondary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteUserHandler(user._id)}
                        variant="danger"
                      >
                        <MdOutlineDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default UsersList;
