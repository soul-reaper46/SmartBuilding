import React,{useState} from "react";
import firebase from "firebase";
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
import EditCurtain from './editCurtain';
import Customdrawer from 'components/CustomDrawer/Customdrawer';

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

export default function CurtainCard(props) {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    On: false
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
    if (!values.On){
      firebase.database().ref('Curtains/Curtain' + id).set({
        power: 0,
      });
   } else if (values.On) {
    firebase.database().ref('Curtains/Curtain' + id).set({
      power: 1,
    });
   } 
 }

  function toggleChecked(id) {
    setChecked((prev) => !prev);
    setValues({ ...values, On: !values.On });  
  };

  return ( 
      <GridItem xs={12} sm={4} md={4}>
        <Card>
          <CardHeader color="primary">
            <h5 className={classes.cardTitleWhite}>Curtain</h5>
          </CardHeader>
          <CardBody>
          <GridItem>
            <p style={{ fontWeight:'500' }}>Power : <Switch checked={checked} onChange={toggleChecked} onClick={pushData(props.id)}/></p>
          </GridItem>
            <GridContainer xs={12} sm={12} md={12} justify="flex-end">
              <Button color="primary" variant='contained' style={{ margin: 10, backgroundColor:'#87a7b3' }} onClick={showDrawer}>Edit</Button>
              <Button color="primary" variant='contained' style={{ margin: 10, backgroundColor:'#ce1212' }}>Remove</Button>
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
                <EditCurtain />
                </div>
              </div>
            </Customdrawer>
          </CardBody>
        </Card>
      </GridItem>
  );
}
