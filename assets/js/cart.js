function cartKey(){ const u=currentUser(); return u? `cart_${u.email}` : 'cart_guest'; }
function getCart(){ return lsRead(cartKey(), []); }
function setCart(items){ lsWrite(cartKey(), items); }

function addToCart(productId){
  const items = getCart();
  const p = getProducts().find(x=>x.id===productId);
  if(!p || p.stock<=0){ alert('Sin stock'); return; }
  const row = items.find(x=>x.productId===productId);
  if(row){ row.qty += 1; }
  else { items.push({productId, qty:1}); }
  setCart(items);
  adjustStock(productId,-1);
  updateCartBadge('#cartCount');
}

function removeFromCart(productId){
  const items = getCart();
  const row = items.find(x=>x.productId===productId);
  if(!row) return;
  adjustStock(productId, row.qty);
  const next = items.filter(x=>x.productId!==productId);
  setCart(next);
  renderCart('#cartTable');
}

function renderCart(containerSel){
  const el = document.querySelector(containerSel);
  const items = getCart();
  if(items.length===0){ el.innerHTML = '<div class="alert alert-info">Tu carrito está vacío.</div>'; return; }
  const products = getProducts();
  let total = 0;
  const rows = items.map(it=>{
    const p = products.find(x=>x.id===it.productId);
    const subtotal = p.price * it.qty; total += subtotal;
    return `<tr>
      <td>${p.name}</td>
      <td>$${p.price.toLocaleString('es-CL')}</td>
      <td>${it.qty}</td>
      <td>$${subtotal.toLocaleString('es-CL')}</td>
      <td><button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${p.id})">Quitar</button></td>
    </tr>`;
  }).join('');
  el.innerHTML = `
    <table class="table table-striped">
      <thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><th colspan="3" class="text-end">Total</th><th>$${total.toLocaleString('es-CL')}</th><th></th></tr></tfoot>
    </table>`;
}

function updateCartBadge(sel){ const el = document.querySelector(sel); if(!el) return; el.textContent = getCart().reduce((a,b)=>a+b.qty,0); }

function checkout(){
  const u = currentUser(); if(!u){ alert('Debes iniciar sesión'); return false; }
  const items = getCart(); if(items.length===0) return false;
  const products = getProducts();
  const detail = items.map(it=>{
    const p = products.find(x=>x.id===it.productId);
    return { id:p.id, name:p.name, price:p.price, qty:it.qty };
  });
  const order = { id: Date.now(), userEmail:u.email, date:new Date().toISOString(), detail };
  const key = `orders_${u.email}`;
  const prev = lsRead(key, []); prev.push(order); lsWrite(key, prev);
  setCart([]);
  return true;
}

function renderOrders(containerSel){
  const u = currentUser(); if(!u){ window.location.href='login.html'; return; }
  const key = `orders_${u.email}`;
  const orders = lsRead(key, []);
  const el = document.querySelector(containerSel);
  if(orders.length===0){ el.innerHTML = '<div class="alert alert-info">Aún no tienes compras.</div>'; return; }
  el.innerHTML = orders.map(o=>{
    const total = o.detail.reduce((t,d)=>t+d.price*d.qty,0);
    return `<div class="card mb-3"><div class="card-body">
      <div class="d-flex justify-content-between">
        <strong>Pedido #${o.id}</strong>
        <span>${new Date(o.date).toLocaleString('es-CL')}</span>
      </div>
      <ul class="mt-2 mb-2">
        ${o.detail.map(d=>`<li>${d.name} x ${d.qty} — $${(d.price*d.qty).toLocaleString('es-CL')}</li>`).join('')}
      </ul>
      <div class="text-end"><span class="fw-bold">Total: $${total.toLocaleString('es-CL')}</span></div>
    </div></div>`;
  }).join('');
}
