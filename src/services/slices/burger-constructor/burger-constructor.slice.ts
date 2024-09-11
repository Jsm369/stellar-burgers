import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const generateId = () => `${Date.now()}-${Math.random()}`;

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = generateId();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearAll: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    updateAll: (state, action: PayloadAction<TConstructorIngredient[]>) => {
      state.ingredients = action.payload;
    }
  }
});

export const { addItem, deleteItem, clearAll, updateAll } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
