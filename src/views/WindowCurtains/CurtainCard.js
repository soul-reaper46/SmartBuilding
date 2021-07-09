import React,{useState, useEffect} from "react";
import firebase from "firebase";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import EditCurtain from './editCurtain';
import Customdrawer from 'components/CustomDrawer/Customdrawer';

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

export default function CurtainCard(props) {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    On: false,
    switch: false,
    openpos: 0
  });

  const [checked, setChecked] = React.useState(false);

  const [state, setState] = React.useState({
    openDrawer: false,
  })

  function showDrawer() {
    setState({ ...state, openDrawer: true })
    return toggleDrawer
  }

  function toggleDrawer(open, event) {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (open === false) {
      setState({ ...state, openDrawer: false })
    }
    setState({ ...state, openDrawer: open })
  };

  function pushData(id) {
    if (props.value == 1){
      firebase.database().ref('Devices/Curtains/' + id).update({
        power: 0,
      });
   } else if (props.value == 0) {
    firebase.database().ref('Devices/Curtains/' + id).update({
      power: 1,
    });
   } 
 }

 function handleRemove(e){
  e.preventDefault()
  deleteData(props.id)
}

function deleteData(id) {
  firebase.database().ref().child('Devices/Curtains/' + id).remove();
}

 useEffect(()=> {
  const devicesRef = firebase.database().ref('Devices/Curtains/' + props.id);
  //firebase.database().ref('Devices/Curtains/' + props.id).set({power: props.value, openpos: props.pos}) //this line ensures db data  does not get overwritten when on page refresh.
  devicesRef.on('value', (snapshot) => {
    if(snapshot.val()){
      switchval(Object.entries(snapshot.val()))
    }
  })
 }, []);

function switchval(data){
  //console.log(data[1][1]);
   if (data[1][1] == 1){
    setChecked(true);
   } else if (data[1][1] == 0){
    setChecked(false);
   }
   setValues({...values, openpos: data[0][1]})
}

const marks = [
  {
    value: 0,
    label: 'Close',
  },
  {
    value: 1,
    label: 'Half open',
  },
  {
    value: 2,
    label: 'Fully open',
  },
];

function valuetext(value) {
  return `${value}`;
}

const handleChange = (event, newValue) => {
  event.preventDefault()
  //console.log(newValue);
  setValues({...values, openpos: newValue});
  firebase.database().ref('Devices/Curtains/' + props.id).update({
    openpos: newValue,
  });
};

  function toggleChecked() {
    setChecked((prev) => !prev);
    //setValues({ ...values, On: !values.On });
    pushData(props.id)  
  };

  return ( 
      <GridItem xs={12} sm={4} md={4}>
        <Card>
          <CardHeader color="primary">
            <h5 className={classes.cardTitleWhite}>{props.id}</h5>
          </CardHeader>
          <CardBody>
          <GridItem>
            <p style={{ fontWeight:'500' }}>Power : <Switch checked={checked} onChange={toggleChecked}/></p>
          </GridItem>
          <GridItem>
          <p style={{ fontWeight:'500' }}>Curtain Position : </p>
          <Slider
            value={values.openpos} 
            onChange={handleChange}
            defaultValue={values.openpos}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={0}
            max={2}
          />
          </GridItem>
            <GridContainer xs={12} sm={12} md={12} justify="flex-end">
              <Button color="primary" variant='contained' style={{ margin: 10, backgroundColor:'#87a7b3' }} onClick={showDrawer}>Edit</Button>
              <Button type='submit' color="primary" variant='contained' style={{ margin: 10, backgroundColor: '#ce1212' }} onClick={handleRemove}>Remove</Button>
            </GridContainer>
            <Customdrawer toggleDrawer={toggleDrawer} openDrawer={state.openDrawer}>
              <div style={{direction:'column', justify:'space-between'}}>
                <div style={{display: 'flex', justifyContent:'flex-end'  , alignItems:'flex-end', marginTop:'10px', marginRight:'10px'}}>
                  <Button
                    color="primary" 
                    variant='contained'
                    style={{ backgroundColor:'#9c27b0' }}
                    onClick={(e) => toggleDrawer(false, e)}
                  >
                    Close
                  </Button>
                </div>
                <div style={{ marginTop:'80px', marginRight:'10px'}}>
                <EditCurtain id={props.id}/>
                </div>
              </div>
            </Customdrawer>
          </CardBody>
        </Card>
      </GridItem>
  );
}
