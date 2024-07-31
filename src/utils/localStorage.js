export const setLocalStorage = (data) => {
  localStorage.setItem("LIST_SV", JSON.stringify(data));
};
export const getLocalStorage = () => {
  if (localStorage.getItem("LIST_SV")) {
    return JSON.parse(localStorage.getItem("LIST_SV"));
  }
  return [];
};
