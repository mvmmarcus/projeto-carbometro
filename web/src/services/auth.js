export const isAuthenticated = () => localStorage.getItem("user-token") !== null;
export const getToken = () => localStorage.getItem("user-token");
export const login = (token) => {
  localStorage.setItem("user-token", token);
};
export const logout = () => {
  localStorage.removeItem("user-token");
};

export const setId = (userId) => {
  sessionStorage.setItem("user-id", userId);
};

export const getId = () => sessionStorage.getItem("user-id");

export const setFoodId = (foodId) => {
  localStorage.setItem("food-id", foodId);
};

export const getFoodId = () => localStorage.getItem("food-id");

export const setRemoveFood = (foodId) => {
  localStorage.setItem("removeFood-id", foodId);
};

export const getRemoveFoodId = () => localStorage.getItem("removeFood-id");