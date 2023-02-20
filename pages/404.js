import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className="text-danger" size="5rem" />
      <h1>404</h1>
      <p className="lead">Sorry, this page does not exists</p>
      <Button className="btn btn-primary" onClick={() => router.push('/')}>
        Go Home
      </Button>
    </div>
  );
}
