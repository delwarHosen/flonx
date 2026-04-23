// hooks/useReturnTo.ts
import { useLocalSearchParams } from 'expo-router';

export function useReturnTo() {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  return returnTo ? decodeURIComponent(returnTo) : null;
}