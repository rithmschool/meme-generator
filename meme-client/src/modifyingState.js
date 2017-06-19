export const saveState = (resp) => {
  try {
    localStorage.setItem('id', resp.data.id);
    localStorage.setItem('token', resp.data.token);
  } catch(err) {
    console.log(err);
  }
}

export const deleteState = (resp) => {
  try {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  } catch(err) {
    console.log(err);
  }
}