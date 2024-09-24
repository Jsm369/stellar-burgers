import { getFeedsThunk, feedsSlice } from '../feeds.slice';
import { TOrder } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

// Мокируем API
jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('feedsSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: true,
    error: undefined
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: [],
      status: 'done',
      name: 'Burger 1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      number: 1
    },
    {
      _id: '2',
      ingredients: [],
      status: 'pending',
      name: 'Burger 2',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      number: 2
    }
  ];

  const mockResponse = {
    orders: mockOrders,
    total: 100,
    totalToday: 10
  };

  it('должен корректно обработать fulfilled экшен', async () => {
    (getFeedsApi as jest.Mock).mockResolvedValueOnce(mockResponse);

    const store = configureStore({
      reducer: { feeds: feedsSlice.reducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
    });

    await store.dispatch(getFeedsThunk() as any);

    const state = store.getState().feeds;

    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeUndefined();
  });

  it('должен корректно обработать rejected экшен', async () => {
    const mockError = new Error('Ошибка загрузки заказов');
    (getFeedsApi as jest.Mock).mockRejectedValueOnce(mockError);

    const store = configureStore({
      reducer: { feeds: feedsSlice.reducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
    });

    await store.dispatch(getFeedsThunk() as any);

    const state = store.getState().feeds;

    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказов');
  });

  it('должен корректно обработать pending экшен', () => {
    const action = { type: getFeedsThunk.pending.type };

    const state = feedsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });
});
