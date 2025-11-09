function currentUser(){
  const s = lsRead(LS_KEYS.session);
  if(!s) return null;
  const users = lsRead(LS_KEYS.users, []);
  return users.find(u => u.email === s.email) || null;
}

function registerUser({name,email,password,role}){
  const users = lsRead(LS_KEYS.users, []);
  if (users.some(u => u.email === email)) return false;
  const id = (users.at(-1)?.id || 0) + 1;
  users.push({id,name,email,passwordHash:btoa(password),role});
  lsWrite(LS_KEYS.users, users);
  return true;
}

function login(email,password){
  const users = lsRead(LS_KEYS.users, []);
  const u = users.find(u => u.email===email && u.passwordHash===btoa(password));
  if(!u) return false;
  lsWrite(LS_KEYS.session,{email:u.email});
  return true;
}

function logout(){ localStorage.removeItem(LS_KEYS.session); }

function updateUser(user){
  const users = lsRead(LS_KEYS.users, []);
  const idx = users.findIndex(u => u.id === user.id);
  if(idx>=0){ users[idx] = user; lsWrite(LS_KEYS.users, users); }
}

function enforceAuth(){ if(!currentUser()){ window.location.href='login.html'; } }
function enforceAdmin(){
  const u = currentUser();
  if(!u) { window.location.href='login.html'; return; }
  if(u.role !== 'admin'){ alert('Se requiere rol Administrador'); window.location.href='index.html'; }
}
