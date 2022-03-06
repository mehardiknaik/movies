var data = [
  [22, "Working late"],
  [18, "Good evening"],
  [12, "Good afternoon"],
  [6, "Good morning"],
  [3, "Whoa, early bird"],
  [0, "Good night"],
];
export const GetMsg = () => {
  const hr = new Date().getHours();
  return data.find((element) => hr >= element[0])[1];
};
