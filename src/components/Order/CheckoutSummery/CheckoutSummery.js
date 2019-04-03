import React from 'react';
import './CheckoutSummery.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
const CheckoutSummery = (props) => {
    return (
        <div className="CheckoutSummery">
            <h1>hope it taste !</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}
export default CheckoutSummery;