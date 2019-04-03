import React from 'react';

import './Input.css';
const input = (props) => {
    let inputElement = null;
    let classInput=["InputElement"];
    
    if(props.validation && props.shouldValidate && props.toutched) {
        classInput.push("invalid");
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                {...props.elementConfig}
                className={classInput.join(' ')}
                value={props.value}
                //validation={props.validation}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                {...props.elementConfig}
                className={classInput.join(' ')}
                value={props.value} 
                onChange={props.changed}/>;
            break;
            case ( 'select' ):
            inputElement = (
                <select
                    className={classInput.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                className={classInput.join(' ') }
                value={props.value} 
                onChange={props.changed}/>;

    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )

};

export default input;