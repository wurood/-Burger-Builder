import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state={
        orders:[],
        loading:true
    }

    componentDidMount() {
       axios.get('/orders.json')
       .then(res =>{
           const Orderdata=[];
            for( let key in res.data){
                 Orderdata.push({
                     ...res.data[key],
                     id: key
                  } );
            }
            this.setState({loading: false, orders: Orderdata});
       })
       .catch(err =>{
           this.setState({loading:false});
       });
    } 

    render() {
        return (
            <div>
                {this.state.orders.map(order =>(
                    <Order key={order.id} 
                    ingredients={order.ingredient}
                    price={order.price}
                    information={order.orderData}
                    />
                ))}
            </div>
        );
    }
}

export default Orders;