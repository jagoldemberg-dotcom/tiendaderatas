# Tienda de ratas – FrontEnd (DSY2202)

- **Tech:** HTML5, CSS3, Bootstrap 5, JavaScript, LocalStorage/SessionStorage.
- **Roles:** `admin@tienda.com` / `Admin#123`, `cliente@tienda.com` / `Cliente#123`.
- **Páginas:** Inicio, Login, Registro, Recuperar contraseña, Perfil, Productos, Carrito, Mis Compras, Admin (CRUD + inventario).
- **Validaciones:** Formularios con `required`, `minlength`, `pattern` y feedback Bootstrap; contraseña con 4 reglas (largo, may/min, número, especial).
- **Responsividad:** Grid Bootstrap (col-12 / col-md-6 / col-lg-4) + navbar colapsable.
- **Pagos:** Simulados; genera orden y descuenta stock.

## Ejecutar
Abrir `index.html` con Live Server (VS Code) o doble clic en el archivo. No requiere backend.

## Estructura de datos
- `tienda_users`, `tienda_session`, `tienda_products`, `cart_<email>`, `orders_<email>`.

## Seguridad
Datos simulados solo con fines académicos. No usar en producción.
