import { configureStore } from '@reduxjs/toolkit';
import store from '../store';
import { rootReducer } from '../rootReducer';

import {
  userInitialState,
  ingredientInitialState,
  ordersInitialState,
  newOrderInitialState,
  feedsInitialState,
  burgerConstructorInitialState
} from '@slices';

describe('rootReducer', () => {
  it('должен корректно создавать начальное состояние хранилища', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();

    const initialStates = {
      user: { ...userInitialState },
      ingredients: { ...ingredientInitialState },
      orders: { ...ordersInitialState },
      newOrder: { ...newOrderInitialState },
      feeds: { ...feedsInitialState },
      burgerConstructor: { ...burgerConstructorInitialState }
    };

    expect(state).toEqual(initialStates);
  });

  it('должен корректно обрабатывать неизвестные действия', () => {
    const initialState = store.getState();
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = rootReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
});
