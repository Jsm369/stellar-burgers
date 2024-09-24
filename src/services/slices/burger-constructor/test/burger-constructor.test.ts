import { TConstructorIngredient } from '@utils-types';
import reducer, {
  addItem,
  deleteItem,
  updateAll,
  clearAll
} from '../burger-constructor.slice';

describe('burgerConstructorSlice reducer', () => {
  const bun: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 10,
    image: 'bun.png',
    image_large: 'bun-large.png',
    image_mobile: 'bun-mobile.png'
  };

  const ingredient: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'Lettuce',
    type: 'main',
    proteins: 1,
    fat: 0,
    carbohydrates: 2,
    calories: 5,
    price: 5,
    image: 'lettuce.png',
    image_large: 'lettuce-large.png',
    image_mobile: 'lettuce-mobile.png'
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  it('должен корректно обрабатывать добавление ингредиента', () => {
    const state = reducer(initialState, addItem(ingredient));

    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toMatchObject({
      _id: ingredient._id,
      name: ingredient.name,
      type: ingredient.type,
      proteins: ingredient.proteins,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
      calories: ingredient.calories,
      price: ingredient.price,
      image: ingredient.image,
      image_large: ingredient.image_large,
      image_mobile: ingredient.image_mobile
    });
    expect(state.ingredients[0].id).toBeDefined(); // Проверяем, что id сгенерирован
  });

  it('должен корректно обрабатывать добавление булки', () => {
    const state = reducer(initialState, addItem(bun));

    expect(state.bun).toMatchObject({
      _id: bun._id,
      name: bun.name,
      type: bun.type,
      proteins: bun.proteins,
      fat: bun.fat,
      carbohydrates: bun.carbohydrates,
      calories: bun.calories,
      price: bun.price,
      image: bun.image,
      image_large: bun.image_large,
      image_mobile: bun.image_mobile
    });
    expect(state.bun?.id).toBeDefined(); // Проверяем, что id сгенерирован
  });

  it('должен корректно обрабатывать удаление ингредиента', () => {
    const initialWithIngredient = {
      ...initialState,
      ingredients: [ingredient]
    };

    const state = reducer(initialWithIngredient, deleteItem(ingredient));

    expect(state.ingredients.length).toBe(0);
  });

  it('должен корректно обрабатывать изменение порядка ингредиентов', () => {
    const ingredient2: TConstructorIngredient = {
      id: '3',
      _id: '3',
      name: 'Tomato',
      type: 'main',
      proteins: 2,
      fat: 0,
      carbohydrates: 4,
      calories: 15,
      price: 7,
      image: 'tomato.png',
      image_large: 'tomato-large.png',
      image_mobile: 'tomato-mobile.png'
    };

    const initialWithIngredients = {
      ...initialState,
      ingredients: [ingredient, ingredient2]
    };

    const updatedIngredients = [ingredient2, ingredient];

    const state = reducer(
      initialWithIngredients,
      updateAll(updatedIngredients)
    );

    expect(state.ingredients).toEqual(updatedIngredients);
  });

  it('должен корректно обрабатывать очистку всех ингредиентов и булки', () => {
    const stateWithIngredients = {
      bun,
      ingredients: [ingredient]
    };

    const state = reducer(stateWithIngredients, clearAll());

    expect(state.bun).toBeNull();
    expect(state.ingredients.length).toBe(0);
  });
});
