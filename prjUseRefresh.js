import { useReducer } from 'react';

export function useRefresh() {
  const [, refresh] = useReducer(value => value + 1, 0);
  return refresh;
}