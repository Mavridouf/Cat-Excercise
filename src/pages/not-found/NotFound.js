import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import classes from "./NotFound.module.css";

function NotFound()  {
    return (
        <Fragment>
        <h2 className={classes.text}>
    Sorry this page isn't available.

</h2>
    <p className={classes.text}>
        The link you followed may be broken, or the page may have been removed. {" "}
        <NavLink to="cats">Go back to Catalogue.</NavLink>
    </p>
        </Fragment>)
}

export default NotFound;