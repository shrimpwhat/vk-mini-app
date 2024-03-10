import { Ref } from "react";

export const transformRef = (field: { ref: Ref<HTMLInputElement> }) => {
  return { ...field, getRef: field.ref, ref: undefined };
};

export const debounce = (fn: () => void, delay: number): { (): void, cancel: () => void } => {
  let timeoutId: NodeJS.Timeout | undefined;
  const debounced = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(), delay);
  };

  const cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }

  debounced.cancel = cancel;
  return debounced;
}