import { ordersSlice, getOrdersThunk } from '../orders.slice';
import { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  const initialState = {
    orders: [],
    isLoading: true
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Burger',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    },
    {
      _id: '2',
      status: 'pending',
      name: 'Pizza',
      createdAt: '2022-01-02',
      updatedAt: '2022-01-02',
      number: 2,
      ingredients: ['ingredient3', 'ingredient4']
    }
  ];

  it('должен вернуть начальное состояние', () => {
    const result = ordersSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен обрабатывать pending состояние', () => {
    const action = { type: getOrdersThunk.pending.type };
    const result = ordersSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(true);
  });

  it('должен обрабатывать fulfilled состояние', () => {
    const action = { type: getOrdersThunk.fulfilled.type, payload: mockOrders };
    const result = ordersSlice.reducer(initialState, action);
    expect(result.orders).toEqual(mockOrders);
    expect(result.isLoading).toBe(false);
  });

  it('должен обрабатывать rejected состояние', () => {
    const action = { type: getOrdersThunk.rejected.type };
    const result = ordersSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(false);
  });
});
