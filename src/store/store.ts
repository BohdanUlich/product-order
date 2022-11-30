import { configureStore, ThunkAction, Action, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PERSIST, persistReducer, persistStore, REHYDRATE, REGISTER, PURGE, PAUSE } from 'redux-persist'
import personalDataReducer from './personalData/personalDataSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  personalData: personalDataReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
