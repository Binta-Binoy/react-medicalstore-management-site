export const getUserMedicines = (user) => {
  const data = JSON.parse(localStorage.getItem('medicines')) || {};
  return data[user] || [];
};

export const saveUserMedicines = (user, meds) => {
  const data = JSON.parse(localStorage.getItem('medicines')) || {};
  data[user] = meds;
  localStorage.setItem('medicines', JSON.stringify(data));
};