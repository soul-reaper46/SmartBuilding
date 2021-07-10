import React, { useState, useEffect } from "react";
import firebase from "firebase";
import  {HuePicker, AlphaPicker}  from 'react-color';
import { HexColorInput } from "react-colorful";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import EditLight from './editLight';
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

export default function LightCard(props) {

   const [values, setValues] = React.useState({
     On: false,
     switch: false,
     supportIntensity: props.supportIntensity,
     supportColor: props.supportColor,
     Color: props.color
   });

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
  
  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);

  function pushData(id) {
     if (props.value == 1){
       firebase.database().ref().child('Devices/Lights/' + id).update({
         power: 0,
       });
    } else if (props.value == 0) {
     firebase.database().ref().child('Devices/Lights/' + id).update({
       power: 1,
     });
    } 
  }

  function handleRemove(e){
    e.preventDefault()
    deleteData(props.id)
  }

  function deleteData(id) {
    firebase.database().ref().child('Devices/Lights/' + id).remove();
 }

  useEffect(()=> {
    const devicesRef = firebase.database().ref('Devices/Lights/' + props.id);
    //firebase.database().ref('Devices/Lights/' + props.id).set({power: props.value}) //this line ensures db data  does not get overwritten when on page refresh.
    devicesRef.on('value', (snapshot) => {
      if(snapshot.val()){
        switchval(Object.entries(snapshot.val()))
      } 
    })
   }, []);

  function switchval(data){
    console.log(data[0][1]);
     if (data[1][1] == 1){
      setChecked(true);
     } else if (data[1][1] == 0){
      setChecked(false);
     }
     setValues({...values, Color:data[0][1], supportColor: data[2][1], supportIntensity: data[3][1]})
    
  } 
  
  function toggleChecked() {
    setChecked((prev) => !prev);
    //setValues({ ...values, On: !values.On });
    pushData(props.id)  
  };

  const handleChangeComplete = (color) => {
     setValues({...values, Color: color.hex });
     console.log(color.hex);
     firebase.database().ref().child('Devices/Lights/' + props.id).update({
       color: color.hex,
     });
    
  };

  // const handleChange = (color) => {
  //   setValues({...values, color: color.hex });
  //   console.log(color.hex);
  // };
  
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
          {/* {(values.supportIntensity == true) ? 
            <GridItem>
              <p style={{ fontWeight:'500' }}>Intensity : </p>
              <AlphaPicker
                color={ values.Color }
                //onChange={ handleChange }
                onChangeComplete={ handleChangeComplete }
              />
            </GridItem>
          : null} */}
          {(values.supportColor == true) ? 
            <GridItem>
              <p style={{ fontWeight:'500' }}>Color :  </p>
               <HuePicker 
                color={ values.Color }
                onChangeComplete={ handleChangeComplete }
              /> 
              {/* <HexColorInput color={values.Color} onChange={handleChangeComplete} /> */}
            </GridItem>
          : null}
    
          <GridContainer xs={12} sm={12} md={12} justify="flex-end">
            <Button color="primary" variant='contained' style={{ margin: 10, backgroundColor: '#87a7b3' }} onClick={showDrawer}>Edit</Button>
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
                <EditLight id={props.id} supportColor={values.supportColor} supportIntensity={values.supportIntensity}/>
                </div>
              </div>
            </Customdrawer>
        </CardBody>
      </Card>
    </GridItem>
  );
}
