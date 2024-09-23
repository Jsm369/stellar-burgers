import { newOrderSlice, newOrderThunk, resetOrder } from '../new-order.slice';
import { TOrder } from '@utils-types';

describe('newOrderSlice', () => {
  const initialState = {
    request: false,
    orderData: null,
    error: null
  };

  const mockOrderData: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Burger',
    createdAt: '2022-01-01',
    updatedAt: '2022-01-01',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  };

  it('должен вернуть начальное состояние', () => {
    const result = newOrderSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен обрабатывать pending состояние', () => {
    const action = { type: newOrderThunk.pending.type };
    const result = newOrderSlice.reducer(initialState, action);
    expect(result.request).toBe(true);
    expect(result.error).toBeNull();
  });

  it('должен обрабатывать fulfilled состояние', () => {
    const action = {
      type: newOrderThunk.fulfilled.type,
      payload: { order: mockOrderData }
    };
    const result = newOrderSlice.reducer(initialState, action);
    expect(result.request).toBe(false);
    expect(result.orderData).toEqual(mockOrderData);
    expect(result.error).toBeNull();
  });

  it('должен обрабатывать rejected состояние', () => {
    const action = {
      type: newOrderThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const result = newOrderSlice.reducer(initialState, action);
    expect(result.request).toBe(false);
    expect(result.error).toBe('Ошибка');
  });

  it('должен сбрасывать состояние при вызове resetOrder', () => {
    const stateWithError = {
      ...initialState,
      request: true,
      orderData: mockOrderData,
      error: 'Ошибка'
    };
    const result = newOrderSlice.reducer(stateWithError, resetOrder());
    expect(result).toEqual(initialState);
  });
});
