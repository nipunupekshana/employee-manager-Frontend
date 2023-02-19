//import Link  from "next/link";
import classes from './MainNavigation.module.css';
import { useRouter } from "next/router";

function MainNavigation() {
  const router = useRouter();
  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={() => router.push("/")}>Employee Manager</div>
    </header>
  );
}

export default MainNavigation;
