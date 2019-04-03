import React from 'react';

import './Order.css';
const Order = (props) => {
    const ingredients = [];
    const information=[];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName],

            }
        );
    }
    for (let ingredientName in props.information) {
        information.push(
            {
                name: ingredientName,
                data: props.information[ingredientName],

            }
        );
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'

            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    const informationOutput = information.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'

            }}
            key={ig.name}>{ig.name} : {ig.data}</span>
    })
    
    return (
        <div className="Order">
            <p>Ingredients: {ingredientsOutput}
            </p>
            <p>Data : {informationOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};
export default Order;
