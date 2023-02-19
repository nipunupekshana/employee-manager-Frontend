import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { Container, Row } from 'react-bootstrap';

function Layout(props) {
  return (
    <Container fluid>
      <Row>
        <MainNavigation />
      </Row>
      <Row>
        <main className={classes.main}>{props.children}</main>
      </Row>
    </Container>
  );
}

export default Layout;
