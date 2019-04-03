import React, { Component } from 'react';

import Aux from '../../hoc/Auxx/Auux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHAndler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREEDIENT_PRIES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};
class BurgerBuilder extends Component {
    state = {
        ingredient: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-appliation.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredient: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }) //to tern array in single number whih is sum 
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldcount = this.state.ingredient[type];
        const updatedcount = oldcount + 1;
        const updatedingrediants = {
            ...this.state.ingredient
        };
        updatedingrediants[type] = updatedcount;
        const priceAddition = INGREEDIENT_PRIES[type];
        const oldPrie = this.state.totalPrice;
        const newPrice = oldPrie + priceAddition;
        this.setState({ totalPrice: newPrice, ingredient: updatedingrediants });
        this.updatePurchaseState(updatedingrediants);
    }

    removeIngredientHandler = (type) => {
        const oldcount = this.state.ingredient[type];
        if (oldcount <= 0) {
            return;
        }
        const updatedcount = oldcount - 1;
        const updatedingrediants = {
            ...this.state.ingredient
        };
        updatedingrediants[type] = updatedcount;
        const priceAddition = INGREEDIENT_PRIES[type];
        const oldPrie = this.state.totalPrice;
        const newPrice = oldPrie - priceAddition;
        this.setState({ totalPrice: newPrice, ingredient: updatedingrediants });
        this.updatePurchaseState(updatedingrediants);

    }

    puechaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchasecanelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchasecontinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredient) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredient
        };
        for (let key in disabledInfo) { //return true or false 
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let order = null;
        let burger = this.state.error ? <p>Ingredients not loaded! </p> : <Spinner />

        if (this.state.ingredient) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredient} />
                    <BuildControls
                        ingredientsAdded={this.addIngredientHandler}
                        ingredientsRemove={this.removeIngredientHandler}
                        ingrediebtdisabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.puechaseHandler} />
                </Aux>
            );
            order = <OrderSummary
                ingredients={this.state.ingredient}
                cancel={this.purchasecanelHandler}
                continue={this.purchasecontinueHandler}
                price={this.state.totalPrice} />;

        }

        if (this.state.loading) {
            order = <Spinner />;
        }
        return (

            <Aux>
                <Modal show={this.state.purchasing} modelclosed={this.purchasecanelHandler}>
                    {order}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHAndler(BurgerBuilder, axios);