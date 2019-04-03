import React, { Component } from 'react';
import './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import fire from './fire';
import Orders from '../Orders/Orders';
require('firebase/auth');
class Auth extends Component {

    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                toutched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    isNumeric: true
                },
                valid: false,
                toutched: false
            },

        },
        formIsValid: false,
        loading: false,
        isSignUp: true,
        authError: ""
    }

    authHandler = (event) => {
        event.preventDefault(); //to prevent send req auto whih reload page 
        this.setState({ loading: true });
        const formData = {
            email: this.state.authForm.email.value,
            password: this.state.authForm.password.value,

        };
        if (this.state.isSignUp) {
            fire.auth().createUserWithEmailAndPassword(formData.email, formData.password).then((u) => {
            }).catch((error) => {
                this.setState({ authError: error.message })
            })
        } else {
            fire.auth().signInWithEmailAndPassword(formData.email, formData.password).then((u) => {
            }).catch((error) => {
                this.setState({ authError: error.message })
            });
        }

    }

    switcAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        });
    }

    inputonChangeHandler = (e, element) => {
        const updatedAuthForm = {
            ...this.state.authForm
        }
        const updatedAuthElement = {
            ...updatedAuthForm[element]
        }
        updatedAuthElement.value = e.target.value;
        updatedAuthElement.toutched = true;
        updatedAuthElement.valid = this.checkValidity(updatedAuthElement.value, updatedAuthElement.validation);
        updatedAuthForm[element] = updatedAuthElement;
        let formIsValid = true;
        for (let el in updatedAuthForm) {
            formIsValid = updatedAuthForm[el].valid && formIsValid;

        }
        this.setState({ authForm: updatedAuthForm, formIsValid: formIsValid })  //update array 
    }

    checkValidity(value, rules) {
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
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    validaty = () => {
        let isLoggedIn = false;
        if (fire.auth().currentUser != null) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
        return isLoggedIn;
    }
    SignOut = () => {
        fire.auth().signOut().then(function () {

        }, function (error) {
            console.error('Sign Out Error', error);
        });
        this.validaty()
        this.props.history.push('/');
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.authForm) {
            formElementArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }
        let form = (
            formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    validation={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    toutched={formElement.config.toutched}
                    changed={(e) => this.inputonChangeHandler(e, formElement.id)} />
            ))
        );

        return (
            <div >
                {this.validaty() ?
                    <div  >
                        <button 
                            className="button"
                            onClick={this.SignOut}>LogOut</button>
                        <Orders />
                    </div>
                    :
                    <div className="Auth">
                        <p className="Danger">{this.state.authError}</p>
                        <form onSubmit={this.authHandler}>
                            {form}
                            <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                        </form>
                        <Button
                            clicked={this.switcAuthModeHandler}
                            btnType="Danger" >SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
                    </div>
                }
            </div>
        );
    }
}

export default Auth;
