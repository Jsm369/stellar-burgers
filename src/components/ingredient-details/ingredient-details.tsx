import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC<{ isModal?: boolean }> = ({ isModal }) => {
  /** TODO: взять переменную из стора */
  const { ingredients } = useSelector((store: RootState) => store.ingredients);

  const { id } = useParams();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI isModal={isModal} ingredientData={ingredientData} />
  );
};
