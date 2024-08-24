'use client';

import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
