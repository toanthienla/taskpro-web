import { useCallback } from 'react';
import { debounce } from 'lodash';

/**
 * Hook to debounce a function.
 */
export const useDebounceFn = (fnToDebounce, delay = 500) => {
  // If delay is not a number, throw an error
  if (isNaN(delay)) {
    throw new Error('Delay value should be a number.');
  }
  // If fnToDebounce is not a function, throw an error
  if (!fnToDebounce || (typeof fnToDebounce !== 'function')) {
    throw new Error('Debounce must have a function');
  }

  // useCallback to memoize the debounced function to prevent unnecessary re-renders (Referential Inequality)
  return useCallback(debounce(fnToDebounce, delay), [fnToDebounce, delay]);
};
