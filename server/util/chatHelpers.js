const users = [];

const addCustomer = ({customerID, customerName, providerID, providerName}) => {
  const customer = {
    customerID,
    customerName
  };
  const provider = {
    providerID,
    providerName
  };
 
  users.push(customer, provider);
};

const addProvider = (id, providerName) => {
  providerName = providerName.trim().toLowerCase();
  if (providerName !== users.providerName || id !== users.providerID) {
    return null;
  }
  return users;
};

module.exports = { addCustomer, addProvider};