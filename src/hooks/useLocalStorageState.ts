import { useEffect, useState } from "react";

interface LocalStorageStateProps<T = string> {
  storageKey: string;
  initialValue: T;
  serializeFn?: (data: T) => string;
  deserializeFn?: (data: string) => T;
}

function useLocalStorageState<T>({
  storageKey,
  initialValue,
  serializeFn = JSON.stringify,
  deserializeFn = (data) => JSON.parse(data) as T,
}: LocalStorageStateProps<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData == null) return;

    const data =
      storedData.length === 0 ? initialValue : deserializeFn(storedData);
    setData(data);
  }, [storageKey]);

  useEffect(() => {
    if (data == null) return;

    localStorage.setItem(storageKey, serializeFn(data));
  }, [data, storageKey]);

  return [data, setData] as const;
}

export default useLocalStorageState;
