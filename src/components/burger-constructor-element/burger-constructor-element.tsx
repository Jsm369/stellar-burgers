import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector, useDispatch, RootState } from '../../services/store';
import { deleteItem, updateAll } from '@slices';
import { TConstructorIngredient } from '@utils-types';

const moveItemInArray = (
  array: TConstructorIngredient[],
  index: number,
  offset: number
): TConstructorIngredient[] => {
  const updatedArray = [...array];
  const item = updatedArray.splice(index, 1)[0];
  updatedArray.splice(index + offset, 0, item);
  return updatedArray;
};

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const { ingredients } = useSelector(
      (store: RootState) => store.burgerConstructor
    );

    const handleMoveDown = () => {
      if (index < ingredients.length - 1) {
        dispatch(updateAll(moveItemInArray(ingredients, index, 1)));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(updateAll(moveItemInArray(ingredients, index, -1)));
      }
    };

    const handleClose = () => {
      dispatch(deleteItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
