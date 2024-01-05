const generateImageIndex = () => Math.floor(Math.random() * 3) + 1;

export default () => {
  const imageIndex = generateImageIndex();
  return [
    `/assets/img/login/bg${imageIndex}.webp`,
    `/assets/img/login/chara${imageIndex}.webp`
  ];
};