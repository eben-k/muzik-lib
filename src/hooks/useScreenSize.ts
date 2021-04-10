import { useSelector } from 'react-redux';

const inRange = (input: number, start: number, end: number) => {
  if (!end) {
    end = start;
    start = 0;
  }
  return input >= start && input <= end;
};

const useScreenSize = () => {
  const width = useSelector((state) => state.ui.screenWidth);

  const min = (value: number) => width >= value;

  const max = (value: number) => width <= value;

  const btw = (min: number, max: number) => inRange(width, min, max);

  return {
    width,
    min,
    max,
    btw,
  };
};

export default useScreenSize;
