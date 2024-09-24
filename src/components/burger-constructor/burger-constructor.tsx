import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearAll, newOrderThunk, resetOrder } from '@slices';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    (store: RootState) => store.burgerConstructor
  );

  const orderRequest = useSelector(
    (store: RootState) => store.newOrder.request
  );

  const orderModalData = useSelector(
    (store: RootState) => store.newOrder.orderData
  );

  const { isInit } = useSelector((store: RootState) => store.user);

  const handleOrderClick = () => {
    if (!isInit) {
      navigate('/login');
      return;
    }
    if (!constructorItems || !constructorItems.bun || orderRequest) return;

    const { bun, ingredients } = constructorItems;

    const data = bun
      ? [bun._id, bun._id].concat(ingredients.map(({ _id }) => _id))
      : [];

    dispatch(newOrderThunk(data));
  };

  const handleCloseOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearAll());
    navigate('/');
  };

  const price = useMemo(() => {
    if (!constructorItems || !constructorItems.bun) return 0;

    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients
      ? constructorItems.ingredients.reduce(
          (s: number, v: TConstructorIngredient) => s + v.price,
          0
        )
      : 0;

    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
