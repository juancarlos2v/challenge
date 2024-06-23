#  Login con Spring y React
Este proyecto implementa una interfaz de autenticación de usuarios que incluye funcionalidades para ingresar, registrarse y recuperar contraseña. Utiliza Spring Boot con Maven y base de datos SQL.

## Clonar y Levantar el Proyecto

### Prerrequisitos
- Java JDK 11+
- Maven 3.6+
- MySQL 8+
- Node 20+

### Pasos para clonar y ejecutar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/juancarlos2v/challenge.git
   cd challenge
   ```
   
2. **Crear la base de datos**
    ```sql
    CREATE DATABASE user_db;
    ```

3. **Configurar variables de entorno**
Configura las siguientes variables de entorno en tu sistema:
    ```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/user_db?serverTimezone=UTC
    spring.datasource.username=${DB_USERNAME}
    spring.datasource.password=${DB_PASSWORD}
    spring.mail.username=${EMAIL_SENDER}
    spring.mail.password=${PASSWORD_SENDER}
    ```

4. **Compilar y ejecutar el proyecto**
    ```bash
    mvn clean install
    mvn spring-boot:run
    El proyecto estará disponible en http://localhost:8080.
    ```

5. **Instalar dependecias del frontend**
     ```bash
    cd frontend
    npm install
    ```

6. **Levantar la aplicación frontend**
   ```bash
    npm run dev
    ```
La aplicación frontend estará disponible en http://localhost:5173.

## Funcionalidades
### Ingresar
- Campos: Email, Password
- Validaciones:
  - El campo Email debe incluir el carácter @.
  - El campo Password debe incluir al menos una letra mayúscula, una letra minúscula, un número, un símbolo, y tener al menos 8 caracteres.
  - Mensaje de error: Si alguno de los datos es incorrecto, mostrar "Usuario/contraseña incorrectos" sin especificar cuál es erróneo.

### Registrarse
- Campos: Nombre, Apellido, Email, Password
- Validaciones:
  - El campo Email debe incluir el carácter @.
  - El campo Password debe incluir al menos una letra mayúscula, una letra minúscula, un número, un símbolo, y tener al menos 8 caracteres.

### Recuperar clave
- Funcionalidad: Eliminar la clave del usuario, generar una nueva y enviarla al email del usuario.

