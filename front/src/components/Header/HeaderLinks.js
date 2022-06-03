/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { Authcontext } from "../../context/auth-context";
import { useContext } from "react";
import "./Header.css"

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const auth = useContext(Authcontext);
  
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button color="transparent" target="_blank">
          <Link
            to="/"
            className={classes.navLink}
            style={{ marginTop: "-17px" }}
          >
            Acceuil
            
          </Link>
        </Button>
      </ListItem>
     
      
      {!auth.token && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Connexion"
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={Apps}
            dropdownList={[
              <Link to="/login-page" className={classes.dropdownLink}>
                Accées responsable
              </Link>,
               <Link to="/login" className={classes.dropdownLink}>
               Accées magasinier
             </Link>,
            ]}
          />
        </ListItem>
      )}

    </List>
  );
}
