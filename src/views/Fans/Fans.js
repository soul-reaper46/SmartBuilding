import React, {useEffect} from "react";
import firebase from "firebase";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FanCard from "./FanCard"
import { Button } from "@material-ui/core";
import Customdrawer from 'components/CustomDrawer/Customdrawer';
import AddFan from './addFan';

export default function Fans() {

  const [state, setState] = React.useState({
    openDrawer: false,
    fdevices : []
  })

  useEffect(()=> {
    const devicesRef = firebase.database().ref('Devices/Fans');
    devicesRef.on('value', (snapshot) => {
      renderfans(snapshot.val())
    })
   }, []);

  function renderfans(data){
    setState({ ...state, fdevices: Object.entries(data)});
  }

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

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <GridContainer xs={12} sm={12} md={12} justify="flex-end">
              <Button color="primary" variant='contained' style={{ margin: 10, backgroundColor:'#6e7c7c' }} onClick={showDrawer}>Add Fan</Button>
            </GridContainer>
            <GridContainer>
              {state.fdevices.map((key) => <FanCard id = {key[0]} value={key[1].power} speed={key[1].speed}/> )}
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
                <AddFan />
                </div>
              </div>
            </Customdrawer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
