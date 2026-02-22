import { useEffect, useMemo, useState } from "react";

interface LocalStorageStateProps<T = string> {
  storageKey: string;
  initialValue: T;
  serializeFn?: (data: T) => string;
  deserializeFn?: (data: string) => T;
}

function parseJsonAsT<T>(data: string) {
  return JSON.parse(data) as T;
}

function useLocalStorageState<T>({
  storageKey,
  initialValue,
  serializeFn = JSON.stringify,
  deserializeFn = parseJsonAsT<T>,
}: LocalStorageStateProps<T>) {
  const storedData = useMemo<T>(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData == null) return initialValue;
    
    return storedData.length === 0 ? initialValue : deserializeFn(storedData);
  }, [storageKey, initialValue, deserializeFn]);
  
  const [data, setData] = useState<T | null>(storedData);

  useEffect(() => {
    if (data == null) return;

    localStorage.setItem(storageKey, serializeFn(data));
  }, [data, storageKey, serializeFn]);

  return [data, setData] as const;
}

export default useLocalStorageState;
