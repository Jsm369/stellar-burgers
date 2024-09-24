import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { RootState, useSelector } from '../../services/store';
import { getOrderByNumberApi } from '@api';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC<{ isModal?: boolean; numberTitle?: string }> = ({
  isModal,
  numberTitle
}) => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData: TOrder = {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  };

  const [order, setOrder] = useState(orderData);

  const { ingredients } = useSelector((store: RootState) => store.ingredients);

  const id = useParams().number;

  useEffect(() => {
    getOrderByNumberApi(Number(id)).then((data) => {
      setOrder(data.orders[0]);
    });
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) return null;

    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <OrderInfoUI
      isModal={isModal}
      numberTitle={`#${order.number}`}
      orderInfo={orderInfo}
    />
  );
};
