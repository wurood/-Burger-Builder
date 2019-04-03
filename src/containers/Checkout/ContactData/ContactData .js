import React, { Component } from 'react';

import axios from '../../../axios-orders';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: { //TUR IT IN ARRAY TO SREIFY THE INPUT
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 15
                },
                valid: false,
                toutched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 20
                },
                valid: false,
                toutched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric:true
                },
                valid: false,
                toutched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 10
                },
                valid: false,
                toutched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail '
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                toutched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); //to prevent send req auto whih reload page 
        this.setState({ loading: true });
        const formData = {};
        for (let fromElement in this.state.orderForm) {
            formData[fromElement] = this.state.orderForm[fromElement].value;
        }
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            });

    }
    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
           
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        

        return isValid;
    }
    inputonChangeHandler = (e, inputIdentefier) => {
        const updatedOrderForm = { //array
            ...this.state.orderForm
        }
        const updatedOrderElement = { //element
            ...updatedOrderForm[inputIdentefier]
        };
        updatedOrderElement.value = e.target.value;  //update value
        updatedOrderElement.toutched = true;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
        updatedOrderForm[inputIdentefier] = updatedOrderElement; //update element
        let formIsValid = true;
        for (let el in updatedOrderForm) {
            formIsValid = updatedOrderForm[el].valid && formIsValid;

        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })  //update array 
    }


    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        validation={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        toutched={formElement.config.toutched}
                        changed={(e) => this.inputonChangeHandler(e, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>

        );
    }
}

export default ContactData;