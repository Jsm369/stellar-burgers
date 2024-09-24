import { getIngredientsThunk, ingredientsSlice } from '../ingredient.slice';
import { configureStore } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  const mockIngredients = [
    { id: '1', name: 'Ingredient 1', type: 'bun' },
    { id: '2', name: 'Ingredient 2', type: 'sauce' }
  ];

  it('должен вернуть начальное состояние', () => {
    const state = ingredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен корректно обработать pending экшен', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен корректно обработать fulfilled экшен', async () => {
    (getIngredientsApi as jest.Mock).mockResolvedValueOnce(mockIngredients);

    const store = configureStore({
      reducer: { ingredients: ingredientsSlice.reducer }
    });

    await store.dispatch(getIngredientsThunk() as any);
    const state = store.getState().ingredients;

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен корректно обработать rejected экшен', async () => {
    const mockError = new Error('Ошибка загрузки ингредиентов');
    (getIngredientsApi as jest.Mock).mockRejectedValueOnce(mockError);

    const store = configureStore({
      reducer: { ingredients: ingredientsSlice.reducer }
    });

    await store.dispatch(getIngredientsThunk() as any);
    const state = store.getState().ingredients;

    expect(state.ingredients).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
