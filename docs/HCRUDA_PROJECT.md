Gestion de pacientes hospital
Basado en hospital BBDD Game project, pero en JavaScript

También será hecho con Angular

# El nombre será HCRUDA

# logo / favicon
![Image](../images/34a7e23742c910627feb9b92baabdf71.jpg) 
![Image](../images/4d6bb97e6d15da543f4b81becc748888.jpg) 

# estetica y diseño css
[enlace](./HCRUDA_DESIGN_SYSTEM.md)

# Trazo básico de lo que es y necesita
- Es como una CRM o ERP de hospital 
- tiene pacientes y médicos 
- los pacientes pueden ser de urgencias, ingresos en planta o no ingresos (en casa pero que dicen siendo pacientes con citas de vez en cuando, como yo) 
- tiene citas, tratamientos y departamentos 
- los médicos solo tienen 1 departamento (odontología, dermatología, etc)
- los pacientes 1 o muchas departamentos
- no se si departamento seria otra tabla en si pero tiene muchos doctores y muchos pacientes
- los médicos y pacientes tienen muchas citas y tratamientos 
- las citas y los tratamientos solo tienen un médico y un paciente por cita o tratamiento
- no se dnd meter a los enfermeros a todo esto pero deberían entar pa que el login sea o de doctores o de enfermeros


---
# Og game project idea
Based on hospital management of patients and the game papers please:
- initial database + id card
- each seaction has database table
- insert user in database only with id
- when good exit him 
-manage database network with users
- random messages/tasks to do with them data (tests, medicine, healthy or worse, department, etc...)
- would like it to be text based/ASCII art on terminal or 2d pixel

# Requisitos 1ra Entrega JS
## RAs INVOLUCRADOS:
RA2 (20% de la nota del proyecto): Manejo de la sintaxis del lenguaje
RA3 (20% de la nota del proyecto): Utilización de los objetos predefinidos del lenguaje
RA4 (30% de la nota del proyecto): Programación con colecciones, funciones y objetos definidos por el usuario (componentes también).
RA5 (30% de la nota del proyecto): Interacción con el usuario: eventos y formularios

## CONSIDERACIONES:
- El número de páginas debe ser al menos de 6.
- Debe haber página de login y de registro con validación de formularios (expresiones regulares, tipos,...)
- Debe haber un menú (debe ser un componente Web)
- La aplicación debe tener al menos la gestión de 2 tipos de objetos y la relación entre ellos. Por ejemplo, clientes y productos y la relación compra
- Cada objeto debe tener más de 5 campos, constructor y al menos 3 métodos adicionales
- Para cada elemento se debe poder dar de alta, modificar, eliminar y consultar.
- Se debe permitir filtrar y ordenar por distintos campos
- Debe haber diferentes eventos: click, keypress,...
- Debe utlizarse setInterval y setTimeout
- Debe haber una carga inicial de los objetos para no partir de un sistema vacío. - Se puede hacer utilizando un archivo js adicional o una petición AJAX.
- Es imprescindible que el código este organizado, con comentarios, legible (nombres de variables y métodos, indexación...)
- Tenéis que utilizar cookies y storage
- En cada proyecto el profesor indicará condiciones especiales

# Requisitos Entrega 1 Angular
## PARTE CLIENTE deberá tener como mínimo (nota máxima 5) 
- Componente login y componente registro con formulario reactivo con validación
- Componente dashboard y componente menu (las opciones sólo aparecen si el usuario esta logeado)

Gestión de 2 tipos de objetos (por ejemplo bicicletas y alquileres):
- mostrar todos
- debe permitir filtrar (será un componente único) y ordenar
- añadir
- modificar
- eliminar
- Los datos se debe mostrar en una tabla para un tipo de objeto y en modo ficha para otro.
- Debe haber un componente para mostrar el detalle de algo (se utiliza con ruta con parámetro).
- Debe haber rutas (alguna con parámetros)
- Deben utilizarse servicios http con observables

Además deberá tener las siguientes:
- Comunicación entre componentes con - - @Input/@Output o con servicios
Carrito.
- Comunicación entre componentes con el uso de señales (por ejemplo al contratar/descontratar que el número de productos del carrito se actualice)
- Gestión de sesión y del perfil (el del perfil admin debe tener acceso a la parte de la aplicación que permite gestionar todas las tablas de la aplicación)
- Opcional (ampliar la nota hasta el 10):
- Animaciones
- Gráficos
- Realizar una prueba unitaria con karma y jasmine
- Cualquier otra opción no vista en clase

## PARTE SERVIDORA deberá tener como mínimo (nota máxima 2) 

- Debe ser una API Rest
- Debe permitir registro y login (no es necesario controlar la sesión)
- Debe permitir el CRUD de los dos tipos de objetos
