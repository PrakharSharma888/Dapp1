import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import {useState, useEffect} from 'react'
import './App.css'
import { ethers } from 'ethers';

function App() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const [greetings, doGreetings] = useState(null)
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)

  useEffect(()=>{
    const loadProvider = async () => {
      const url = 'http://127.0.0.1:8545';
      const provider = new ethers.providers.JsonRpcProvider(url)
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );
      setContract(contract)
      setProvider(provider)
      console.log(contract)
    }
    loadProvider()

    

  },[])

  useEffect(()=>{
    const getGreetings = async () => {
      const greet = await contract.greet();
      doGreetings(greet)
      
    }
    contract && getGreetings()
  }, [contract])

  const changeGreetings = async () =>{
    const inputValue = document.getElementById('input').value;
      const signer = contract.connect(provider.getSigner())
      signer.setGreeting(inputValue)

      setTimeout(()=>{
          window.location.reload(1);
      },500)
      setTimeout()
  }

  return (
    <div className="App container my-4">
      <h1>{greetings}</h1>
      <div className="input-group mb-3 my-5">
      <input id="input" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2"/>
      <button type="submit" className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={changeGreetings}>Button</button>
      </div>
    </div>
  );
}

export default App;
