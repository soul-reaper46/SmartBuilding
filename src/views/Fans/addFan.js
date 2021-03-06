import React,{useState} from "react";
import firebase from "firebase";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {TextField} from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";

const styles = {
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

export default function AddFan() {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    id: null,
    devices: [],
    iderr: false,
    powerr: false,
    speedMax: null
  });

  const [state, setState] = React.useState({
    submit: false
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });   /*this function handles values when user types in textfield*/
  };

  function handleSubmit(e){
    e.preventDefault()
    pushData(values.id)
  }

  function pushData(id) {
    if (id != null) {
        firebase.database().ref('Devices/Fans/Fan' + id).set({
          power: 0, speed: 0, speedMax: parseInt(values.speedMax)
        });
    }
  }

  return ( 
      <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h5 className={classes.cardTitleWhite}>ADD NEW FAN</h5>
          </CardHeader>
          <CardBody>
          <form>
              <GridContainer justify="center">
              <GridItem>
              <TextField required
                    id='id'
                    label="Fan ID"
                    type='text'
                    variant="outlined"                                               /*code for id field*/
                    value={values.id}
                    onChange={handleChange('id')}
                    error={values.id === "" || values.iderr}
                    helperText={values.iderr ? 'id already exists!' : null}
                    style={{ margin: 10 }}
                  />
            </GridItem>
            <GridItem>
                  *default power value will be 0.
            </GridItem>
            <GridItem>
              <TextField required
                    id='speedMax'
                    label="Fan Max Speed"
                    type='number'
                    variant="outlined"                                               /*code for id field*/
                    value={values.speedMax}
                    onChange={handleChange('speedMax')}
                    error={values.id === "" || values.iderr}
                    //helperText={values.iderr ? 'id already exists!' : null}
                    style={{ margin: 10 }}
                  />
            </GridItem>
              <GridContainer xs={12} sm={12} md={12} justify="flex-end">
              <Button type='submit' color="primary" variant='contained' style={{ margin: 10, backgroundColor: '#423F3E' }} onClick={handleSubmit}>Submit</Button>
              </GridContainer>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      </div>
  );
}