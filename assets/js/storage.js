// Almacenamiento en localStorage
const LS_KEYS = {
  users: 'tienda_users',     // [{id,name,email,passwordHash,role}]
  session: 'tienda_session', // {email}
  products: 'tienda_products', // [{id,name,price,stock,image}]
  cart: 'tienda_cart',       // por usuario: cart_${email}
  orders: 'tienda_orders'    // por usuario: orders_${email}
};

function lsRead(key, def){
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : (def ?? null);
}
function lsWrite(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

// Inicializa datos de ejemplo si no existen
(function seed(){
  if(!lsRead(LS_KEYS.users)){
    lsWrite(LS_KEYS.users,[
      {id:1,name:'Admin',email:'admin@tienda.com',passwordHash:btoa('Admin#123'),role:'admin'},
      {id:2,name:'Cliente',email:'cliente@tienda.com',passwordHash:btoa('Cliente#123'),role:'customer'}
    ]);
  }
  if(!lsRead(LS_KEYS.products)){
    lsWrite(LS_KEYS.products,[
      {id:1,name:'Teclado Mecánico',price:34990,stock:10,image:'assets/img/teclado.jpg'},
      {id:2,name:'Mouse Inalámbrico',price:19990,stock:25,image:'assets/img/mouse.jpg'},
      {id:3,name:'Audífonos',price:29990,stock:15,image:'assets/img/audifonos.jpg'}
    ]);
  }
})();
