import { ChangeEvent, useState } from 'react';

const useInput = (initialState = '') => {
  const [input, setInput] = useState(initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);
  return [input, handleChange];
};

export default useInput;
