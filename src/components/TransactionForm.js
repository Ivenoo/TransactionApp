import React from 'react';
import './style/TransactionForm.css';


const  TransactionForm = (props) => {
  return (
    <div className="TransactionForm">
      <div className="TransactionForm__Body">
     <h3 className="TransactionForm__Title">DODAJ TRANSAKCJE:</h3>
     <div className="TransactionForm__Box">
      <form onSubmit={props.addTrans.bind(this)} className="TransactionForm__Form">
          <div className="TransactionForm__NameBox">
            <h4 className="TransactionForm__Spans">Nazwa transakcji:</h4>
            <input id="Form_Name" className="TransactionForm__Name TransactionForm__Inputs" maxLength="25" type="text" placeholder="opłata za..."/>
            <div className="TransactionForm__NameValidation">
                <span className="Validation TransactionForm__NameValidationSpan">PODAJ NAZWĘ TRANSAKCJI !!</span>
              </div>
          </div>
        <div className="TransactionForm__CostBox">
        <h4 className="TransactionForm__Spans">Kwota transakcji: </h4>
        <input id="Form_Cost" className="TransactionForm__Cost TransactionForm__Inputs" placeholder="00.00 EUR" value={props.currentValueInputCost} onChange={props.changeValueInput.bind(this,2)}/>
        <div className="TransactionForm__CostValidation">
            <div className=" Validation TransactionForm__CostValidationSpan">PODAJ KWOTE TRANSAKCJI !!</div>
          </div>
        </div> 
        <div>
        <div id="Success__Transaction" className="Validation__Success">POMYŚLNIE DODANO TRANSAKCJE !</div>  
        </div>
        <input className="TransactionForm__Button TransactionForm__Inputs" type="submit"  value="Dodaj transakcje"/>
      </form>
     </div>
     </div>
    </div>
  );
}

export default TransactionForm;
