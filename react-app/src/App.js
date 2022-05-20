import './app.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

    let [cats, getNodeData] = useState([{}])
    //Geting data that is send from backend/node/express in this case object cats
    useEffect(() => {
      fetch("/api").then(
        resp => resp.json()
      ).then(
        data => {
          getNodeData(data)
        }
      )
    }, [])


    function CatsName(){
      return (
        cats.map(el => <p key={el.key}>Cats name: {el.name}</p>)
      )};

    function CatsAge(){
        return (
          cats.map(el => <p key={el.key}>Cats age: {el.age}</p>)
      )};
    
    function CatsColor(){
        return (
          cats.map(el => <p key={el.key}>Cats color: {el.color}</p>)
    )};
    
    const [nameToggle, addNameToggle] = useState(0)
    const [ageToggle, addAgeToggle] = useState(0)
    const [colorToggle, addColorToggle] = useState(0)

    const nameToggler = () => {
      nameToggle ? addNameToggle(0) : addNameToggle(1)
      ageToggle ? addAgeToggle(0) : addAgeToggle(0)
      colorToggle ? addColorToggle(0) : addColorToggle(0)  
    }

    const ageToggler = () => {
      ageToggle ? addAgeToggle(0) : addAgeToggle(1)
      colorToggle ? addColorToggle(0) : addColorToggle(0)
      nameToggle ? addNameToggle(0) : addNameToggle(0)   
    }

    const colorToggler = () => {
      colorToggle ? addColorToggle(0) : addColorToggle(1) 
      nameToggle ? addNameToggle(0) : addNameToggle(0)
      ageToggle ? addAgeToggle(0) : addAgeToggle(0)   
    }

    function Cats(){
      return (
        cats.map(el =>
        <div className="cats" key={el.key}>
            <p>{el.key}.</p>
            <p>Cats name: {el.name}</p>
            <p>Cats age: {el.age}</p>
            <p>Cats color: {el.color}</p><br></br>
        </div>)
      )};

      let buttonName;
      let buttonAge;
      let buttonColor;
  
      if(nameToggle)
        buttonName = <CatsName />
      if(ageToggle)
        buttonAge = <CatsAge />
      if(colorToggle)
        buttonColor = <CatsColor />
  
      const [Cat, getCat] = useState(0)
  
      const PrintCat = () =>{
        if(Cat > cats.length || Cat < 0)
          return(<p>Wrong input...</p>)
        else{
          for(let i in cats){
            if(i == Cat - 1){
              return(
                <div className="cats" key={cats[i].key}>
                    <p>Cats name: {cats[i].name}</p>
                    <p>Cats age: {cats[i].age}</p>
                    <p>Cats color: {cats[i].color}</p><br></br>
                </div>)
            }
          }   
        }
      }
      let catPrint;
      const [cat, getCatPrint] = useState(0)
      const showCat = () => {
        cat ? getCatPrint(0) : getCatPrint(1)
      }
      let displaySearch = {};
      let displayExit = {};
      if(cat){
        catPrint = <PrintCat />
        displaySearch={ display: 'none' }
        displayExit={ visibility: 'visible' }
      }
      else{
        displayExit={ visibility: 'hidden' }
      }
  
    //Add new cat
    const [catFormToggle, addNewCatForm] = useState(0)

    const toggleNewCatForm = () => {
      catFormToggle ? addNewCatForm(0) : addNewCatForm(1)
    }

    let catForm;

    const [newCatObj, getNewCatObj] = useState({
      name: '',
      color: '',
      age: ''
    })

    //Sending new cat that we created to backend side
    const toggleInsert = e => {
      //e.preventDefault();
      axios.post("http://localhost:5000/Addcat", newCatObj)
        .then(resp => {
          console.log(resp)
        })
        .catch(error => {
          console.log(error)
    })};

    if(catFormToggle){
      catForm = (
        <form onSubmit={toggleInsert}>
          <br></br>Cat name: <input onInput={el => getNewCatObj({...newCatObj, name: el.target.value})} type="text"></input><br></br><br></br>
          Cat color: <input onInput={el => getNewCatObj({...newCatObj, color: el.target.value})} type="text"></input><br></br><br></br>
          Cat age: <input onInput={el => getNewCatObj({...newCatObj, age: el.target.value})} type='text'></input><br></br><br></br>
          <button value='Submit'>Submit</button>
        </form>
    )};

    //Delete any cat
    const [showDelCatForm, getDelCatForm ] = useState(0)

    const toggleDelCatForm = () => {
      showDelCatForm ? getDelCatForm(0) : getDelCatForm(1)
    }

    const [delCatObj, getDelCatObj] = useState({
      key: 0,
      name: '',
    })

    const checkCatInObj = () => {
        const keys = cats.map(el => el.key)
        const names = cats.map(el => el.name)
        for(let i in names)
          if(names[i].toUpperCase() === delCatObj.name.toUpperCase() && keys[i] === +delCatObj.key)     
              return i;
        return false;
    }

    const toggleDel = () => {
      if(checkCatInObj()){
        axios.post("http://localhost:5000/Delcat", cats[checkCatInObj()])
        .then(resp => {
          console.log(resp)
        })
        .catch(error => {
          console.log(error)
        })
      }
      else
        console.error('Not in database....')
    };

    let delCatForm;
    if(showDelCatForm){
      delCatForm = (
          <form onSubmit={toggleDel}>
              <br></br>Cat key: <input onInput={el => getDelCatObj({...delCatObj, key: el.target.value})} type='text'></input><br></br><br></br>
              Cat name: <input onInput={el => getDelCatObj({...delCatObj, name: el.target.value})} type='text'></input><br></br><br></br>
              <input type='submit' value='Delete'></input>
          </form>    
      )
    }

  return (
    <div>
      Cats Stuff:<br></br>
      <button onClick={ageToggler}>Age</button>
      <button onClick={nameToggler}>Name</button>
      <button onClick={colorToggler}>Color</button>
      {buttonName}
      {buttonAge}
      {buttonColor}
      <Cats />
      <p>You have {cats.length} cats, pick cat you wanna find out about? </p><form style={displaySearch}><input onInput={e => getCat(e.target.value)} type='text'></input> <input onClick={showCat} value="Submit" type="button"></input></form>
      {catPrint}
      <input style={displayExit} onClick={showCat} type='button' value='exit'></input><br></br><br></br>
      <input onClick={toggleNewCatForm} type="button" value='Add New Cat'></input>
      <input onClick={toggleDelCatForm} type="button" value='Delete Cat'></input>
      {catForm}<br></br><br></br>
      {delCatForm}
    </div>
  );
}

export default App;
