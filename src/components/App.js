import React from 'react';
import './style/App.css';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import Currency from './Currency';
import axios from "axios";

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      Currency: 1,
      defCurrency: 0,
      listTrans: [],
      currentValueInputCurrency: '',
      currentValueInputCost: ''
    }
}
  componentDidMount(){
    axios.get('http://api.nbp.pl/api/exchangerates/rates/A/EUR/').then(
          (res)=>{
            this.setState({
              defCurrency: parseFloat(res.data.rates[0].mid),
              Currency: parseFloat(res.data.rates[0].mid)
            })
            const loader = document.querySelector('.loader');
            loader.style.display="none";
          }).catch(()=>{
            console.log("Problem z pobaniem danych");
          })
  }

  addTrans = (e) => {
      e.preventDefault() 
      const name = e.currentTarget.Form_Name.value;
      const costTrans = e.currentTarget.Form_Cost.value;
      const validationName = document.querySelector('.TransactionForm__NameValidationSpan');
      const validationCost = document.querySelector('.TransactionForm__CostValidationSpan');
      const formNameInput = document.querySelector('#Form_Name');
      const formCostInput = document.querySelector('#Form_Cost');

        if(name.length === 0){
          if(costTrans.length !== 0 && costTrans !== '.' ){
            validationCost.style.display='none';
            formCostInput.style= "border-color:var(--border-color)";
          }else{
            validationCost.style.display='block';
            formCostInput.style= "border-color:var(--validation-color);";
          }
          validationName.innerHTML = " PODAJ NAZWĘ TRANSAKCJI";
          validationName.style.display='block';
          formNameInput.style= "border-color:var(--validation-color);";
          
          if(costTrans.length === 0){
            if(name.length !== 0  && name.charAt(0,1) !== ' '){
              validationName.style.display='none';
              formNameInput.style= "border-color:var(--validation-color)";
            }
            validationCost.innerHTML = "PODAJ KWOTĘ TRANSAKCJI !"
            validationCost.style.display='block';
            formCostInput.style= "border-color:var(--validation-color);";
          }else if(costTrans === '.'){
            if(name.length !== 0  && name.charAt(0,1) !== ' '){
              validationName.style.display='none';
              formNameInput.style= "border-color:var(--border-color)";
            }
            validationCost.innerHTML = "PODAJ PRAWIDŁOWĄ KWOTĘ TRANSAKCJI !"
            validationCost.style.display='block';
            formCostInput.style= "border-color:var(--validation-color);";
          }

        }else if(name.charAt(0,1) === ' '){
          if(costTrans.length !== 0 && costTrans !== '.' ){
            validationCost.style.display='none';
            formCostInput.style= "border-color:var(--border-color)";
          }else{
            validationCost.style.display='block';
            formCostInput.style= "border-color:var(--validation-color);";
          }
          validationName.innerHTML = " NAZWA NIE MOŻE ZACZYNAĆ SIĘ OD SPACJI";
          validationName.style.display='block';
          formNameInput.style= "border-color:var(--validation-color);";

          if(costTrans.length === 0){
            if(name.length !== 0  && name.charAt(0,1) !== ' '){
              validationName.style.display='none';
              formNameInput.style= "border-color:var(--validation-color)";
            }
            validationCost.innerHTML = "PODAJ KWOTĘ TRANSAKCJI !"
            validationCost.style.display='block';
            formCostInput.style= "border-color:var(--validation-color);";
          }else if(costTrans === '.'){
            if(name.length !== 0  && name.charAt(0,1) !== ' '){
              validationName.style.display='none';
              formNameInput.style= "border-color:var(--border-color)";
            }
            validationCost.innerHTML = "PODAJ PRAWIDŁOWĄ KWOTĘ TRANSAKCJI !"
            validationCost.style.display='block';
            formCostInput.style= "border-color:var(--validation-color);";
          }

        }else if(costTrans.length === 0){
          if(name.length !== 0  && name.charAt(0,1) !== ' '){
            validationName.style.display='none';
            formNameInput.style= "border-color:var(--validation-color)";
          }
          validationCost.innerHTML = "PODAJ KWOTĘ TRANSAKCJI !"
          validationCost.style.display='block';
          formCostInput.style= "border-color:var(--validation-color);";
        }else if(costTrans === '.'){
          if(name.length !== 0  && name.charAt(0,1) !== ' '){
            validationName.style.display='none';
            formNameInput.style= "border-color:var(--border-color)";
          }
          validationCost.innerHTML = "PODAJ PRAWIDŁOWĄ KWOTĘ TRANSAKCJI !"
          validationCost.style.display='block';
          formCostInput.style= "border-color:var(--validation-color);";
        }else{
          const obj ={
            name,
            costTrans
          }
          this.state.listTrans.push(obj)
          this.setState({
            listTrans: this.state.listTrans,
            // currentValueInputCost: ''
          })
         const Success_trans = document.querySelector("#Success__Transaction")
          Success_trans.style.display ="block";
          formNameInput.style= "border-color:var(--Success-color)";
          formCostInput.style= "border-color:var(--Success-color)";
          // formNameInput.value = "";
          validationCost.style.display='none';
          validationName.style.display='none';
          setTimeout(this.finishSuccessForm,1500,Success_trans,formNameInput,formCostInput)
        }  
  }

  finishSuccessForm = (Success_trans,formNameInput,formCostInput) =>{
    Success_trans.style.display ="none";
    formNameInput.style= "border-color:var(--border-color)";
    formCostInput.style= "border-color:var(--border-color)";
  }

  delOneTrans = (index) =>{
    this.state.listTrans.splice(index, 1)
    this.setState({
      listTrans: this.state.listTrans
    }) 
  }

  delAllTrans = () =>{
    this.setState({
      listTrans: []
    })
  }
 

  changeValueInput = (numb,e) =>{
    let currentValueInput = e.currentTarget.value;
    let reg = 0;
    if(numb=== 1){
       reg = /^(([0-9]{0,3})(\.[0-9]{0,2})?$)/;
    }else if(numb=== 2){
       reg = /^(([0-9]*)(\.[0-9]{0,2})?$)/;
    }
    if (currentValueInput.match(reg) != null) {
      currentValueInput = currentValueInput.match(reg)[0]
      if(numb === 1){
        this.setState({
          currentValueInputCurrency: currentValueInput 
        })
      }else if(numb === 2){
        this.setState({
          currentValueInputCost: currentValueInput 
        })
      }
    }
  }

  changeCurrency = () =>{
    const newCurrencyValue = document.querySelector('#CurrencyValue').value;
    const validation = document.querySelector('.Currency__Validation');
    const CurrencyValueInput  = document.querySelector('#CurrencyValue');
    if(newCurrencyValue > 0){
      if(parseFloat(newCurrencyValue) !== parseFloat(this.state.Currency)){
        this.setState({
          Currency: parseFloat(newCurrencyValue),
          currentValueInputCurrency: ''
        })
        validation.innerHTML = 'POMYŚLNIE ZMIENIONO WALUTĘ !'
        validation.style.display='block';
        validation.style.color='var(--Success-color)';
        CurrencyValueInput.style= "border-color:var(--Success-color)";
        setTimeout(this.addSuccess,1500,CurrencyValueInput,validation)
      }else{
        validation.innerHTML = 'PODAJ INNĄ WARTOŚĆ OD AKTUALNEJ !'
        validation.style.display='block';
        CurrencyValueInput.style= "border-color:var(--validation-color)";
      }
    }else{
      if(newCurrencyValue === '.'){
        validation.innerHTML = 'WPISZ PRAWIDŁOWĄ WARTOŚĆ WALUTY !'
        validation.style.display='block';
        CurrencyValueInput.style= "border-color:var(--validation-color)";
      }else{
        validation.innerHTML = 'PODAJ WARTOŚĆ WALUTY !'
        validation.style.display='block';
        CurrencyValueInput.style= "border-color:var(--validation-color)";
      }

    }

  }

  addSuccess = (e,validation) =>{
        validation.style.display='none';
        validation.style.color='var(--validation-color)';
        e.style= "border-color:var(--border-color)";
        e.value = "";
  }

  backCurrency = () =>{
    this.setState({
      Currency: this.state.defCurrency
    })
  }
  render(){
    return (
      <div className="App_body">
        <div className="loader">

        </div>
      <Currency changeCurrency={this.changeCurrency} currentValueInput={this.state.currentValueInputCurrency} backCurrency={this.backCurrency} changeValueInput={this.changeValueInput.bind(this)} currentCurrency={this.state.Currency} defCurrency={this.state.defCurrency}/>
      <TransactionForm currentValueInput={this.state.currentValueInputCost} changeValueInput={this.changeValueInput.bind(this)} addTrans={this.addTrans.bind(this)}/>
      <TransactionList delAllTrans={this.delAllTrans} delOneTrans={this.delOneTrans} currentCurrency={this.state.Currency} listTrans={this.state.listTrans} />
      </div>
    );
  }
}

export default App;
