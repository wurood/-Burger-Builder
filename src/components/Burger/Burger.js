import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger =( props ) => {
  //wrap objet into array 
  let transformedIngredient = Object.keys(props.ingredients)
      .map(typekey => {
        return [...Array(props.ingredients[typekey])].map((_,quentaty)=> {
            return <BurgerIngredient key={typekey + quentaty} type={typekey}/>
        });
      })
    .reduce((arr,el) =>{
        return arr.concat(el)//to creat only one array 
    },[]);

    if(transformedIngredient.length === 0) {
      transformedIngredient=<p>Please Start Add Ingredients !</p>;
    }
  return (
      <div className="Burger">
         <BurgerIngredient type="bread-top" />
            {transformedIngredient}
         <BurgerIngredient type="bread-bottom" />
      </div>
  );
};

export default burger;