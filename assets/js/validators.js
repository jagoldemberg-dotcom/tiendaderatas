// Reglas de contraseñas: 8-32, mayus, minus, numero, especial
function isStrongPassword(pw){
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$/;
  return regex.test(pw);
}
