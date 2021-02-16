import jwtDecode from 'jwt-decode';

//function to decode token
const decodeUser = () => {
  const token = localStorage.getItem("token");
  
  if (token) {
    const decodedToken = jwtDecode(token)
    console.log(decodedToken, "yup")
    return decodedToken
  }
  
};

//get local storage
const getLocalStorage = () => {
  const localData = localStorage.getItem("token")
  return localData;
}
export {decodeUser, getLocalStorage};