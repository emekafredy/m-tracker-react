
export const getRandomMail = () => {
  const string = Math.random().toString(36).substr(2, 8);
  return `${string}@randommail.com`;
}
