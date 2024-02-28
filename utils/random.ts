const getRandomInteger = (min: number, max: number): number => {
  const randomBuffer = new Uint32Array(1);

  crypto.getRandomValues(randomBuffer);

  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);

  const integer = Math.floor(randomNumber * (maxValue - minValue + 1)) + minValue;

  return integer;
};

export default getRandomInteger;
