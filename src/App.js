import React, { useState } from "react";
import logo from "./logo.svg";

// Contracts and Web3
import { simpleStorage } from "./abi/simpleStorage.js";
import Web3 from "web3";

// UI Components
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

// Styles
import "./App.css";

const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0xa0bc61bfb147751628459f7ea4b8e4626cc71ff4";
const simpleContract = new web3.eth.Contract(simpleStorage, contractAddress);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
 }));

function App() {
  const classes = useStyles();
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");

  const numberSet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await simpleContract.methods.set(number).estimateGas();
    const post = await simpleContract.methods.set(number).send({
      from: account,
      gas,
    });
  };

  const numberGet = async (t) => {
    t.preventDefault();
    const post = await simpleContract.methods.get().call();
    setGet(post);
  };

  return (
    <div className={classes.root}>
      <div className="main">
        <div className="card">
          <TextField
            id="outlined-basic"
            label="Set your uint256:"
            onChange={(t) => setUint(t.target.value)}
            variant="outlined"
          />
          <form className="form" onSubmit={numberSet}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="Confirm"
            >
              Confirm
            </Button>
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={numberGet}
              type="button"
            >
              Get your uint256
            </Button>
            {getNumber}
          </form>
        </div>
      </div>
    </div>
  );
 }
 
 export default App;