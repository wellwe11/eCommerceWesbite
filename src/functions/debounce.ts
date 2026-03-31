const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timerId);

    timerId = setTimeout(() => callback(...args), delay);
  };
};

export default debounce;
