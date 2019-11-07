import React from 'react';
import './style/TransactionList.css';

const  TransactionList = (props) => {
  let sumTrans = 0;
  sumTrans = parseFloat(sumTrans);
  let maxTrans = 0;
  maxTrans = parseFloat(maxTrans);
  let maxTransName = "BRAK TRANSAKCJI";
  return (
    <div className="TransactionList">
      <span> NAJWYŻSZA AKTUALNA TRANSAKCJA:</span><br/>
      <div className="highestTrans">
      {props.listTrans.map((event,index) =>{
        if(event.costTrans > maxTrans){
          maxTrans = event.costTrans
          maxTransName= event.name
        }
        return(null)
      })} 
     { (props.listTrans.length >0) ?
           <table className="TableOneItem">
           <tbody>
             <tr>
               <th className="TableOneItem__Title highestTrans_NameTitle">NAZWA</th>
               <th className="TableOneItem__Title highestTrans_EURTitle"> KWOTA EUR</th>
               <th className="TableOneItem__Title highestTrans_PLNTitle"> KWOTA PLN</th>
             </tr>
             <tr>
               <td className="TableOneItem__Value highestTrans_Name">{maxTransName}</td>
               <td className="TableOneItem__Value highestTrans_EUR"> {parseFloat(maxTrans).toFixed(2)}</td>
               <td className="TableOneItem__Value highestTrans_PLN"> {(parseFloat(maxTrans)*props.currentCurrency).toFixed(2)}</td>
             </tr>
           </tbody>
         </table>:
         <span> BRAK TRANSAKCJI</span>
     }
      </div>   
      <span>LISTA TRANSAKCJI:</span>  
      <div className="TransactionList_ValueBox">  
        <table className="TableOneItem">
          <tbody>
              <tr className="TableOneItem__AllTitle">
                <th className="TableOneItem__Title TableOneItem__TitleName">NAZWA</th>
                <th className="TableOneItem__Title TableOneItem__TitleCost">KWOTA EUR</th>
                <th className="TableOneItem__Title TableOneItem__TitleCost">KWOTA PLN</th>
                <th className="TableOneItem__Title TableOneItem__TitleDel"> USUŃ </th>
              </tr>
            {props.listTrans.map((event,index) =>{
              sumTrans = sumTrans + parseFloat(event.costTrans)
              let plnCost = parseFloat(event.costTrans)*props.currentCurrency;
              plnCost = plnCost.toFixed(2)
              event.costTrans= parseFloat(event.costTrans).toFixed(2)
              return(
                <tr key={index}>
                <td className="TableOneItem__Value TableOneItem__Name">{event.name}</td>
                <td className="TableOneItem__Value TableOneItem__CostEUR"> {event.costTrans}</td>
                <td className="TableOneItem__Value TableOneItem__CostPLN">{plnCost}</td>
                <td className="TableOneItem__Value"><button className="TableOneItem__Delete" onClick={()=>{props.delOneTrans(index)}}>USUŃ</button></td>
                </tr>
              )})}
          </tbody>
        </table>
      </div>
      <div className="Sum__Box">
      <span> SUMA TRANSAKCJI:</span>
      <div className="Sum_TableBox"> 
        <table className="Sum_Table">
          <tbody>
            <tr>
                <th className="TableOneItem__Title TitleSum__Title">SUMA W EUR</th>
                <th className="TableOneItem__Title TitleSum__Title">SUMA W PLN</th>
                <th className="TableOneItem__Title TitleDel__Title">USUŃ WSZYSTKO </th>
              </tr>     
              <tr>
                <td className="Sum__Trans">{sumTrans.toFixed(2)}</td>
                <td className="Sum__Trans">{(sumTrans*props.currentCurrency).toFixed(2)}</td>
               <td><button className="Button__DeleteAll" onClick={props.delAllTrans}>USUŃ</button></td> 
              </tr>
          </tbody>
        </table>
      </div>
     </div>
    </div>
  );
}

export default TransactionList;
