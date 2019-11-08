import React from 'react';
import './style/Currency.css';

const  Currency = (props) => {
  return (
    <>
    <div className="Currency__BankCurrency">
    <p className="Currency__CurrentCurrency"> AKTUALNY  KURS EURO WYNOSI : 1 EUR =  {props.currentCurrency.toFixed(2)} PLN</p>
    <p className="Currency_BankCurrencyValue"> ( aktualny kurs według  NBP wynosi 1 EUR = {props.defCurrency.toFixed(2)} PLN) <button className="Back_defCurrency" href=""  onClick={props.backCurrency}>przywróć kurs</button></p>
    </div>
    <div className="Currency">
        <h3 className="Currency__Form"> ZMIEŃ KURS EURO</h3>
        <div className="Currency__Box">
          <div className="Currency__CurrentCurrency">
            <span>1 EUR =</span>
            <input id="CurrencyValue" value={props.currentValueInput} onChange={props.changeValueInput.bind(this,1)} placeholder={props.currentCurrency.toFixed(2)} /> 
            <span>PLN</span>
          </div>
          <div className="Currency__ValidationBox">
            <span className="Currency__Validation Validation"> PODAJ WARTOSC WALUTY !!</span>
          </div>
          <div className="Currency__ButtonBox">
            <input type="button" onClick={props.changeCurrency} className="Currency__ButtonChange" value="zmień walute"/> 
          </div>
        </div>
    </div>
    </>
  );
}

export default Currency;
