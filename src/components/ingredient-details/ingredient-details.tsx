import React from 'react';
import {Data} from "../../models/data";
import styles from './ingredient-details.module.css';

type Props = {
  ingredient: Data | null;
}

const IngredientDetails = ({ ingredient }: Props) => {
  if (ingredient) {
    return (
      <div className={styles.container}>
        <div className={`${styles.imageWrapper} mb-4`}>
          <img className={styles.image} src={ingredient.image_large} alt={ingredient.name}/>
        </div>
        <p className={`${styles.name} text text_type_main-medium`}>{ingredient.name}</p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className='text text_type_main-default'>Калории,ккал</span>
            <span className='text text_type_digits-default'>{ingredient.calories}</span>
          </li>
          <li className={styles.item}>
            <span className='text text_type_main-default'>Белки, г</span>
            <span className='text text_type_digits-default'>{ingredient.proteins}</span>
          </li>
          <li className={styles.item}>
            <span className='text text_type_main-default'>Жиры, г</span>
            <span className='text text_type_digits-default'>{ingredient.fat}</span>
          </li>
          <li className={styles.item}>
            <span className='text text_type_main-default'>Углеводы, г</span>
            <span className='text text_type_digits-default'>{ingredient.carbohydrates}</span>
          </li>
        </ul>
      </div>
    );
  }
  return null;
};

export default IngredientDetails;
