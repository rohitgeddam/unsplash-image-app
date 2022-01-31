import React, {useState} from 'react'
import { Button, Checkbox, Grid, Modal } from 'semantic-ui-react'

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CONFIG_CLOSE_ON_DIMMER_CLICK':
      return { ...state, closeOnDimmerClick: action.value }
    case 'CONFIG_CLOSE_ON_ESCAPE':
      return { ...state, closeOnEscape: action.value }
    case 'OPEN_MODAL':
      return { ...state, open: true }
    case 'CLOSE_MODAL':
      return { ...state, open: false }
    default:
      throw new Error()
  }
}

function ModalExampleCloseConfig() {
    const [state, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: true,
    dimmer: undefined,
  })
  const { open, closeOnEscape, closeOnDimmerClick } = state

  const [counter, setCounter] = useState(5);
  const [showCounter, setShowCounter] = useState(false)

  const handleClose = () => {

    if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = "Thank you Meghna for making my minor project";
        window.speechSynthesis.speak(msg);
        
        }
      
      setTimeout(() => {
          dispatch({type:'CLOSE_MODAL'})
      }, 6000)

      setInterval(() => {
        setCounter(c => {
            c = c - 1
            return c
        })
      }, 1000)

      setShowCounter(true)
  }

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        //   trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header style={{width: '100%', height: '150px'}}>Developed By Meghna Parikhar for Rajeev Mandle</Modal.Header>
         { showCounter &&  
         <Modal.Content>
             <h1>Thank you meghna for making my minor project 🙏🏻</h1>
            <p>Wait {counter} seconds</p>
          </Modal.Content>}
          <Modal.Actions>
            {/* <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} negative>
              No
            </Button> */}
            <Button onClick={handleClose} positive disabled={showCounter}>
              Say Thanks and Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  )
}

export default ModalExampleCloseConfig