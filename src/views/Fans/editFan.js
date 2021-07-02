import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function EditFan() {

  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return ( 
      <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h5 className={classes.cardTitleWhite}>EDIT FAN</h5>
          </CardHeader>
          <CardBody>
          <GridItem>
            <p style={{ fontWeight:'500' }}>Power : <Switch checked={checked} onChange={toggleChecked} /></p>
          </GridItem>
            <GridContainer xs={12} sm={12} md={12} justify="flex-end">
              <Button color="primary" variant='contained' style={{ margin: 10, backgroundColor:'#87a7b3' }}>Edit</Button>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      </div>
  );
}