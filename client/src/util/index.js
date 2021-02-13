import jwtDecode from 'jwt-decode';

//function to decode token
const decodeUser = () => {
  const token = localStorage.getItem("token");
  return jwtDecode(token);
};

//get local storage
const getLocalStorage = () => {
  const localData = localStorage.getItem("token")
  return localData;
}
export {decodeUser, getLocalStorage};