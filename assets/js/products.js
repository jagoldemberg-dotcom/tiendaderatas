function getProducts(){ return lsRead(LS_KEYS.products, []); }
function setProducts(arr){ lsWrite(LS_KEYS.products, arr); }

function upsertProduct(dto){
  const items = getProducts();
  if(dto.id){
    dto.id = Number(dto.id);
    const i = items.findIndex(x=>x.id===dto.id);
    if(i>=0) items[i] = dto;
  } else {
    dto.id = (items.at(-1)?.id || 0) + 1;
    items.push(dto);
  }
  setProducts(items);
}

function deleteProduct(id){
  const items = getProducts().filter(p=>p.id!==id);
  setProducts(items);
}

function adjustStock(id, delta){
  const items = getProducts();
  const p = items.find(x=>x.id===id); if(!p) return;
  p.stock = Math.max(0, (p.stock || 0) + delta);
  setProducts(items);
}

function renderProducts(containerSel, cartBadgeSel){
  const el = document.querySelector(containerSel);
  const items = getProducts();
  el.innerHTML = items.map(p=>`
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.name}"/>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text mb-2">$${p.price.toLocaleString('es-CL')}</p>
          <span class="badge ${p.stock>0? 'text-bg-success':'text-bg-secondary'} mb-3">Stock: ${p.stock}</span>
          <button class="btn btn-primary mt-auto" ${p.stock<=0?'disabled':''} onclick="addToCart(${p.id})">Agregar</button>
        </div>
      </div>
    </div>`).join('');
  updateCartBadge(cartBadgeSel);
}

function renderAdmin(containerSel){
  const items = getProducts();
  const el = document.querySelector(containerSel);
  el.innerHTML = `
    <table class="table table-striped align-middle">
      <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
      <tbody>
        ${items.map(p=>`
          <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>$${p.price.toLocaleString('es-CL')}</td>
            <td>${p.stock}</td>
            <td class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary" onclick="openEdit(${p.id})">Editar</button>
              <button class="btn btn-sm btn-outline-danger" onclick="(deleteProduct(${p.id}), renderAdmin('${containerSel}'))">Eliminar</button>
              <button class="btn btn-sm btn-outline-success" onclick="(adjustStock(${p.id},1), renderAdmin('${containerSel}'))">+1</button>
              <button class="btn btn-sm btn-outline-warning" onclick="(adjustStock(${p.id},-1), renderAdmin('${containerSel}'))">-1</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;
  window.openEdit = (id)=>{
    const p = getProducts().find(x=>x.id===id);
    document.getElementById('prodId').value = p.id;
    document.getElementById('prodName').value = p.name;
    document.getElementById('prodPrice').value = p.price;
    document.getElementById('prodStock').value = p.stock;
    document.getElementById('prodImage').value = p.image || '';
    new bootstrap.Modal('#modalProduct').show();
  };
}
