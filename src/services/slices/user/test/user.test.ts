import {
  userSlice,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  updateUserThunk
} from '../user.slice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const initialState = {
    isInit: false,
    isLoading: false,
    user: {
      email: '',
      name: ''
    },
    error: ''
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('должен вернуть начальное состояние', () => {
    const result = userSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('должен обрабатывать pending состояние для getUserThunk', () => {
    const action = { type: getUserThunk.pending.type };
    const result = userSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(true);
    expect(result.isInit).toBe(false);
  });

  it('должен обрабатывать fulfilled состояние для getUserThunk', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const result = userSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.isInit).toBe(true);
    expect(result.user).toEqual(mockUser);
  });

  it('должен обрабатывать rejected состояние для getUserThunk', () => {
    const action = {
      type: getUserThunk.rejected.type,
      error: { message: 'Ошибка получения пользователя' }
    };
    const result = userSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.isInit).toBe(false);
    expect(result.error).toBe('Ошибка получения пользователя');
  });

  it('должен обрабатывать fulfilled состояние для loginUserThunk', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const result = userSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(mockUser);
    expect(result.isInit).toBe(true);
  });

  it('должен сбрасывать состояние при вызове logoutUserThunk', () => {
    const stateWithUser = { ...initialState, isInit: true, user: mockUser };
    const action = { type: logoutUserThunk.fulfilled.type };
    const result = userSlice.reducer(stateWithUser, action);
    expect(result.user).toEqual({ email: '', name: '' });
    expect(result.isInit).toBe(false);
  });

  it('должен обрабатывать fulfilled состояние для updateUserThunk', () => {
    const updatedUser = { ...mockUser, name: 'Updated User' };
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: { user: updatedUser }
    };
    const result = userSlice.reducer(initialState, action);
    expect(result.isInit).toBe(true);
    expect(result.user).toEqual(updatedUser);
  });

  it('должен обрабатывать rejected состояние для updateUserThunk', () => {
    const action = {
      type: updateUserThunk.rejected.type,
      error: { message: 'Ошибка обновления пользователя' }
    };
    const result = userSlice.reducer(initialState, action);
    expect(result.isInit).toBe(false);
    expect(result.error).toBe('Ошибка обновления пользователя');
  });
});
