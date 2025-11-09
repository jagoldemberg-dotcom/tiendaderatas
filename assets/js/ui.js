function buildNavbar(){
  const u = currentUser();
  const nav = document.getElementById('mainNav');
  nav.innerHTML = `
    <div class="container">
      <a class="navbar-brand" href="index.html"><strong>Tienda de ratas</strong></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="products.html">Productos</a></li>
          ${u && u.role==='admin' ? '<li class="nav-item"><a class="nav-link" href="admin.html">Admin</a></li>' : ''}
        </ul>
        <ul class="navbar-nav ms-auto">
          ${u ? `
            <li class="nav-item"><a class="nav-link" href="orders.html">Mis compras</a></li>
            <li class="nav-item"><a class="nav-link" href="profile.html">${u.name}</a></li>
          ` : `
            <li class="nav-item"><a class="nav-link" href="login.html">Entrar</a></li>
            <li class="nav-item"><a class="nav-link" href="register.html">Registro</a></li>
          `}
        </ul>
      </div>
    </div>`;
}
