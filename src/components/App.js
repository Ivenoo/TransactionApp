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
      currency: 1,
      defCurrency: 0,
      listTrans: [],
      currentValueInputCurrency: '',
      currentValueInputCost: '',
    }
}

getNBPCurrency = () =>{
  axios.get('h31232ttp://api.nbp.pl/api/exchangerates/rates/A/EUR/').then(
    (res)=>{
      this.setState({
        defCurrency: parseFloat(res.data.rates[0].mid),
        currency: parseFloat(res.data.rates[0].mid)
      })
      setTimeout(() =>{
        const loader = document.querySelector('.Loader-Background');
        loader.style.visibility="hidden"
      },2000)     
    }).catch(()=>{    
       const defaultCurrencyButton = document.querySelector('.Currency_BankCurrencyValue')
       defaultCurrencyButton.style.display="none";
      setTimeout(() =>{
        const loader = document.querySelector('.Loader-Background');
        loader.style.visibility="hidden"
        alert("Problem z pobaniem danych Wpisz walute ręcznie");
      },2000)
    })  
}
  componentDidMount(){
    if(!localStorage.getItem('myTransaction')){
      localStorage.setItem('myTransaction' , '[]')
    }else{
      this.setState({
        listTrans:JSON.parse(localStorage.getItem('myTransaction'))
       }) 
      }

      this.getNBPCurrency();  
  }

  addTrans = (e) => {
      e.preventDefault() 
      const name = e.currentTarget.Form_Name.value;
      const costTrans = e.currentTarget.Form_Cost.value;
      const validationName = document.querySelector('.TransactionForm__NameValidationSpan');
      const validationCost = document.querySelector('.TransactionForm__CostValidationSpan');
      const formNameInput = document.querySelector('#Form_Name');
      const formCostInput = document.querySelector('#Form_Cost');
      const success_trans = document.querySelector("#Success__Transaction");
      this.finishSuccessForm(success_trans,formNameInput,formCostInput)
        if(name.length === 0){
          if(costTrans.length !== 0 && costTrans !== '.' ){
            validationCost.style.visibility='hidden';
            formCostInput.style= "border-color:var(--border-color)";
          }else{
            validationCost.style.visibility='visible';
            formCostInput.style= "border-color:var(--validation-color);";
          }
          validationName.innerHTML = " PODAJ NAZWĘ TRANSAKCJI";
          validationName.style.visibility='visible';
          formNameInput.style= "border-color:var(--validation-color);";
          
          if(costTrans.length === 0){
            if(name.length !== 0  && name.charAt(0,1) !== ' '){
              validationName.style.visibility='hidden';
              formNameInput.style= "border-color:var(--validation-color)";
            }
            validationCost.innerHTML = "PODAJ KWOTĘ TRANSAKCJI !"
            validationCost.style.visibility='visible';
            formCostInput.style= "border-color:var(--validation-color);";
          }else if(costTrans === '.'){
            if(name.length !== 0  && name.charAt(0,1) !== ' '){
              validationName.style.visibility='hidden';
              formNameInput.style= "border-color:var(--border-color)";
            }
            validationCost.innerHTML = "PODAJ PRAWIDŁOWĄ KWOTĘ TRANSAKCJI !"
            validationCost.style.visibility='visible';
            formCostInput.style= "border-color:var(--validation-color);";
          }

        }else if(name.charAt(0,1) === ' '){
          if(costTrans.length !== 0 && costTrans !== '.' ){
            validationCost.style.visibility='hidden';
            formCostInput.style= "border-color:var(--border-color)";
          }else{
            validationCost.style.visibility='visible';
            formCostInput.style= "border-color:var(--validation-color);";
          }
          validationName.innerHTML = " NAZWA NIE MOŻE ZACZYNAĆ SIĘ OD SPACJI";
          validationName.style.visibility='visible';
          formNameInput.style= "border-color:var(--validation-color);";

          if(costTrans.length === 0){
            if(name.length !== 0  && name.charAt(0,1) !== ' '){
              validationName.style.visibility='hidden';
              formNameInput.style= "border-color:var(--validation-color)";
            }
            validationCost.innerHTML = "PODAJ KWOTĘ TRANSAKCJI !"
            validationCost.style.visibility='visible';
            formCostInput.style= "border-color:var(--validation-color);";
          }else if(costTrans === '.'){
            if(name.length !== 0  && name.charAt(0,1) !== ' '){
              validationName.style.visibility='hidden';
              formNameInput.style= "border-color:var(--border-color)";
            }
            validationCost.innerHTML = "PODAJ PRAWIDŁOWĄ KWOTĘ TRANSAKCJI !"
            validationCost.style.visibility='visible';
            formCostInput.style= "border-color:var(--validation-color);";
          }

        }else if(costTrans.length === 0){
          if(name.length !== 0  && name.charAt(0,1) !== ' '){
            validationName.style.visibility='hidden';
            formNameInput.style= "border-color:var(--border-color)";
          }
          validationCost.innerHTML = "PODAJ KWOTĘ TRANSAKCJI !"
          validationCost.style.visibility='visible';
          formCostInput.style= "border-color:var(--validation-color);";
        }else if(costTrans === '.'){
          if(name.length !== 0  && name.charAt(0,1) !== ' '){
            validationName.style.visibility='hidden';
            formNameInput.style= "border-color:var(--border-color)";
          }
          validationCost.innerHTML = "PODAJ PRAWIDŁOWĄ KWOTĘ TRANSAKCJI !"
          validationCost.style.visibility='visible';
          formCostInput.style= "border-color:var(--validation-color);";
        }else{
          const obj ={
            name,
            costTrans
          }
          this.state.listTrans.push(obj)
          console.log(this.state.listTrans)
          localStorage.setItem("myTransaction", JSON.stringify(this.state.listTrans))
          this.setState({
            listTrans: this.state.listTrans,
            idItemList: this.state.idItemList+1,
            currentValueInputCost: ''
          })
          success_trans.style.visibility ="visible";
          formNameInput.style= "border-color:var(--success-color)";
          formCostInput.style= "border-color:var(--success-color)";
          formNameInput.value = "";
          validationCost.style.visibility='hidden';
          validationName.style.visibility='hidden';
          setTimeout(this.finishSuccessForm,1500,success_trans,formNameInput,formCostInput)
        }  
  }

  finishSuccessForm = (success_trans,formNameInput,formCostInput) =>{
    success_trans.style.visibility ="hidden";
    formNameInput.style= "border-color:var(--border-color)";
    formCostInput.style= "border-color:var(--border-color)";
  }

  delOneTrans = (index) =>{
    this.state.listTrans.splice(index, 1)
    localStorage.setItem("myTransaction", JSON.stringify(this.state.listTrans))
    this.setState({
      listTrans: this.state.listTrans
    }) 
  }

  delAllTrans = () =>{
    this.setState({
      listTrans: []
    })
    localStorage.setItem("myTransaction", JSON.stringify([]))
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
    const currencyValueInput  = document.querySelector('#CurrencyValue');
    this.addSuccess(currencyValueInput,validation);
    if(newCurrencyValue > 0){
      if(parseFloat(newCurrencyValue) !== parseFloat(this.state.currency)){
        this.setState({
          currency: parseFloat(newCurrencyValue),
          currentValueInputCurrency: ''
        })
        validation.innerHTML = 'POMYŚLNIE ZMIENIONO WALUTĘ !'
        validation.style.visibility='visible';
        validation.style.color='var(--success-color)';
        currencyValueInput.style= "border-color:var(--success-color)";
        currencyValueInput.value = "";
        setTimeout(this.addSuccess,1500,currencyValueInput,validation)
      }else{
        validation.innerHTML = 'PODAJ INNĄ WARTOŚĆ OD AKTUALNEJ !'
        validation.style.visibility='visible';
        currencyValueInput.style= "border-color:var(--validation-color)";
      }
    }else{
      if(newCurrencyValue === '.'){
        validation.innerHTML = 'WPISZ PRAWIDŁOWĄ WARTOŚĆ WALUTY !'
        validation.style.visibility='visible';
        currencyValueInput.style= "border-color:var(--validation-color)";
      }else{
        validation.innerHTML = 'PODAJ WARTOŚĆ WALUTY !'
        validation.style.visibility='visible';
        currencyValueInput.style= "border-color:var(--validation-color)";
      }

    }

  }

  addSuccess = (e,validation) =>{
        validation.style.visibility='hidden';
        validation.style.color='var(--validation-color)';
        e.style= "border-color:var(--border-color)";
        
  }

  backCurrency = () =>{
    this.setState({
      currency: this.state.defCurrency
    })
  }
  render(){
    return (
      <div className="App_body">
        <div className="Loader-Background">
          <img className="Loader" src='Loader.gif' alt="Loader"/>
        </div>
      <Currency changeCurrency={this.changeCurrency} currentValueInput={this.state.currentValueInputCurrency} backCurrency={this.backCurrency} changeValueInput={this.changeValueInput.bind(this)} currentCurrency={this.state.currency} defCurrency={this.state.defCurrency}/>
      <TransactionForm currentValueInputCost={this.state.currentValueInputCost} changeValueInput={this.changeValueInput.bind(this)} addTrans={this.addTrans.bind(this)}/>
      {(this.state.listTrans.length > 0)?
      <TransactionList delAllTrans={this.delAllTrans} delOneTrans={this.delOneTrans} currentCurrency={this.state.currency} listTrans={this.state.listTrans} />:
      <p className="Empty_List">AKTUALNIE NIE  DODANO ŻADNEJ TRANSAKCJI</p>}
      </div>
    );
  }
}

export default App;
