import React from 'react'
import {TextField} from '@material-ui/core';

export default function CurrencyRow(props) {
    const {
        currencyOptions, 
        selectedCurrency, 
        onChangeCurrency, 
        amount, 
        onChangeAmount
    } = props
    
    return (
        <div>
            {/* <input type="number" className="input" value={amount} onChange={onChangeAmount} /> */}
            <TextField type="number" label="Currency" variant="outlined" value={amount} onChange={onChangeAmount} />
            <select variant="outlined" value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (                    
                    <option style={{padding: "2px"}} class='option' key={option} value={option}>{option}</option>
                ))}
            </select>            
        </div>
    )
}
