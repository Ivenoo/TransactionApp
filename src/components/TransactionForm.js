import React from 'react';
import './style/TransactionForm.css';


const  TransactionForm = (props) => {
  return (
    <div className="TransactionForm">
      <div className="TransactionForm__Body">
     <p className="TransactionForm__Title">DODAJ TRANSAKCJE:</p>
     <div className="TransactionForm__Box">
      <form onSubmit={props.addTrans.bind(this)} className="TransactionForm__Form">
          <div className="TransactionForm__NameBox">
            <span className="TransactionForm__Spans">Nazwa transakcji:</span>
            <input id="Form_Name" className="TransactionForm__Name TransactionForm__Inputs" maxLength="25" type="text" placeholder="opłata za..."/>
            <div className="TransactionForm__NameValidation">
                <span className="Validation TransactionForm__NameValidationSpan">PODAJ NAZWĘ TRANSAKCJI !!</span>
              </div>
          </div>
        <div className="TransactionForm__CostBox">
        <label className="TransactionForm__Spans">Kwota transakcji: </label>
        <input id="Form_Cost" className="TransactionForm__Cost TransactionForm__Inputs" placeholder="00.00 EUR" value={props.actualValueInput} onChange={props.changeValueInput.bind(this,2)}/>
        <div className="TransactionForm__CostValidation">
            <div className=" Validation TransactionForm__CostValidationSpan">PODAJ KWOTE TRANSAKCJI !!</div>
          </div>
        </div> 
        <div>
        <p id="Success__Transaction" className="Validation__Success">POMYŚLNIE DODANO TRANSAKCJE !</p>  
        </div>
        <input className="TransactionForm__Button TransactionForm__Inputs" type="submit"  value="Dodaj transakcje"/>
      </form>
     </div>
     </div>
    </div>
  );
}

export default TransactionForm;
