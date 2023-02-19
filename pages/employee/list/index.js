import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { BiTable } from "react-icons/bi";
import { FaThList } from "react-icons/fa";
import UsersList from "../../../components/user/UsersListTable";
import SearchBar from "../../../components/Custom/searchBar";
import { filterUsers } from "../../../store/user-slice";
import searchContext from "../../../context/searchContext";
import classes from "./list.module.css";

function List() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchTexts = useContext(searchContext);
  const [isList, setIsList] = useState(true);
  const handleAddEmployee = () => {
    router.push("/employee/add");
  };
  const handleSearch = (searchText) => {
    dispatch(filterUsers(searchText));
  };
  return (
    <>
      <Row className={classes["users-functions"]}>
        <Col className={classes["emptyPlaceholder"]}></Col>
        <Col>
          <SearchBar onSearch={handleSearch} filters={searchTexts} />
        </Col>
        <Col className={classes.actions}>
          <Button variant="primary" onClick={handleAddEmployee}>
            Add Employee
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsList(!isList)}
            className="ml-2"
          >
            {isList ? <FaThList /> : <BiTable />}
          </Button>
        </Col>
      </Row>
      <Row>
        <UsersList isList={isList} />
      </Row>
    </>
  );
}

export default List;
