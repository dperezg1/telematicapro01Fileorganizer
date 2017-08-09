# NodeJS Proyecto01

By: Diego Alejandro Perez Gutierrez - dperezg1@eafit.edu.co

# Descripción de aplicación

Aplicacion web que permite hacer gestion de cualquier tipo de archivo y verlos facilmente listado, permite hacer un crud basico sobre los archivos (nombre del archivo, tipo del archivo y su  tamaño)
# 1. Análisis

## 1.1 Requisitos funcionales:

1. Crear archivo.
2. Buscar archivo por parte del titulo
3. Borrar archivo por id del archivo 
4. Listar todos los archivos de la base de datos que sean publicas y del 2017
5. Listar los archivos privados de un usuario
6. Listar los archivos compartidos con un usuario
7. Crear usuario
8. Borrar Usuario
9. Actualizar la contraseña del usuario

## 1.2 Definición de tecnología de desarrollo y despliegue para la aplicación:

* Lenguaje de Programación: Javascript
* Framework web backend: NodeJS - Express
* Framework web frontend: AngularJS
* Base de datos: MongoDB
* Web App Server: NodeJS
* Web Server: NGINX

# 2. Desarrollo

Se generó la base del servidor, con Yeoman:

	$ yo express

se genera la base del cliente con angular
	$ ng new fileOrganizer

# 3. Diseño:

## 3.1 Modelo de datos:

	file:
	{
	  	 title: String,
 		type:String,
 		size:String,
 		owner_username: String,
 		year: String,
 		visibility:String,
 		shared_with: [{
 			username: String
 		}]
	}

	person: 
	{
	 	username: String,
		password: String
	}

## 3.2 Servicios Web
### Canciones

	/* Servicio Web: Crear File
	  Método: POST
	  Autenticado: SI
	  URI: /file
	  Body:
	  {
		var file = new File({
      			title: string
      			type: string,
      			size: string,
      			owner_username: string,
      			year:req.body.year,
      			visibility: string,
      			shared_with: ({});
	 }
	*/
	/* Servicio Web: Listar todas los archivos publicos
	  Método: GET
	  Autenticado: NO
	  URI: /file
	*/
	

	/* Servicio Web: Listar todas los archivos privados
	  Método: POST
	  Autenticado: SI
	  URI: /getFiles
	BODY{	
		"username":val

	}
	
	*/
	
	/* Servicio Web: Buscar canciones privadas por titulo
	  Método: POST
	  Autenticado: Si
	  URI: /search
	BODY:{
		"title":val,
		"username":val
	}
	*/
	
	
	/* Servicio Web: Listar los archivos compartidas
	  Método: GET
	  Autenticado: SI
	  URI: /sharedWithMe
	BODY:{
		"username":val	
	}
	*/
	
	
	/* Servicio Web: Actualizar Archivo
	  Método: POST
	  Autenticado: SI
	  URI: /updateFile
	  Body:
	  {	"_id":val
		  "title": val,
		  "type": val,
		  "size": val,
		  "visibility" : val,
		 
	  }
	*/
	
	/* Servicio Web: Borrar archivo por Id
	  Método: POST
	  Autenticado: SI
	  URI: /deleteFile
	  Body:
	  {
		  "id": val
	  }
	*/

	/* Servicio Web: buscar un archivo por su id
	  Método: POST
	  Autenticado: SI
	  URI: /searchFile
	  Body:
	  {
		  "id": val
	  }
	*/

	/* Servicio Web: asignarle a un archivo un usuario (a este le aparece como compartido con el)
	  Método: POST
	  Autenticado: SI
	  URI: /shareFileWith
	  Body:
	  {
		  "_id": val, //id del archivo
		"username":val //usuario a compartirle este archivo
	  }
	*/	
### Usuarios
	/* Servicio Web: Crear usuario
	  Método: POST
	  Autenticado: NO
	  URI: /signup
	  Body: 
	  {
	  	"username": "usuario",
	  	"password": "password"
	  }
	*/
	/* Servicio Web: Ingresar a la plataforma con un usuario
	  Método: POST
	  Autenticado: NO
	  URI: /login
	  Body: 
	  {
	  	"username": "usuario",
	  	"password": "password"
	  }
	*/
	/* Servicio Web: Actualizar Usuario
	  Método: POST
	  Autenticado: SI
	  URI: /updateUser
	  Body: 
	  {
	  	"username": val,
	  	"password": password,
	  }
	*/
	
	/* Servicio Web: Borrar usuario
	  Método: POST
	  Autenticado: SI
	  URI: /user
	BODY:{
		"username":val	
	}
	*/

	/* Servicio Web: deslogearse
	  Método: POST
	  Autenticado: SI
	  URI: /user
	BODY:{
		"username":val	
	}
	*/
	
	/* Servicio Web: buscar si un usuario existe
	  Método: POST
	  Autenticado: SI
	  URI: /user
	BODY:{
		"username":val	
	}
	*/
	/* Servicio Web: obtener la informacion del usuario logeado
	  Método: GET
	  Autenticado: SI
	  URI: /userInfo
	*/

# 4. Despligue en un Servidor Centos 7.x en el DCA

## 4.1 Se instala nvm local para el usuario

source: https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

      user1$ nvm install v7.7.4
## 4.2 se instala el cliente de angular
	dperezg1$npm install --save @angular/cli

## 4.3 Se instala el servidor mongodb

como root:

      user1$ sudo yum install mongodb-server -y'

ponerlo a correr:

      user1$ sudo systemctl enable mongod
      user1$ sudo systemctl start mongod

## 4.3 Se instala NGINX

      user1$ sudo yum install nginx
      user1$ sudo systemctl enable nginx
      user1$ sudo systemctl start nginx

Abrir el puerto 80

      user1$ sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
      user1$ sudo firewall-cmd --reload

## 4.5 Abrir los puertos en el firewall que utilizara la app:

      user1$ firewall-cmd --zone=public --add-port=4000/tcp --permanent
      user1$ firewall-cmd --reload
      user1$ firewall-cmd --list-all

## 4.6 Se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

      user1$ npm install -g pm2
      user1$ cd dev/fileOrganizer/
      user1$ pm2 start app.js dperezg1
      user1$ pm2 list

ponerlo como un servicio, para cuando baje y suba el sistema:    

      user1$ sudo pm2 startup systemd

Deshabilitar SELINUX

          user1$ sudo vim /etc/sysconfig/selinux

                SELINUX=disabled

          user1$ sudo reboot      

### 4.6 Configuración del proxy inverso en NGINX para cada aplicación:

      // /etc/nginx/nginx.config
      .
      .
      server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  10.131.137.219;
        root         /usr/share/nginx/html;
      .
      .
      location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
      }

     location /dperezg1/server/ {
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header Host $http_host;
         proxy_set_header X-NginX-Proxy true;
         proxy_pass http://10.131.137.219:4000/;
        }

	location /dperezg1/ {
        if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        #
        # Custom headers and headers various browsers should be OK with but aren't
        #
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        #
        # Tell client that this pre-flight info is valid for 20 days
        #
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
     }
     if ($request_method = 'POST') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
     }
     if ($request_method = 'GET') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
     }
         alias /home/dperezg1/dev/fileOrganizer/fileOrgnizerClient/dist/;
         try_files $uri$args $uri$args/ /dperezg1/index.html;
        }
      .
      .


# 5. Despliege Produccion:

## 5.1 Proveedor de PaaS: Heroku:

Pasos para el despliegue luego de tener la cuenta:
Se descarga el CLI de Heroku: https://devcenter.heroku.com/articles/heroku-command-line
Luego en la terminal se ejecutan los siguentes pasos:
	
	$ heroku login
	>usernamae:dperez1@eafit.edu.co
	>password *********
	luego de ingresar a la cuenta creada en heroku,moverse a la carpeta en donde se tiene el proyecto con cd
	$git init
	$ git add .
	$ git commit -m "first"
	$ git push heroku master

y se verifica en la pagina https://hidden-shore-27024.herokuapp.com/

## 5.2 Proveedor de BDaaS mLab:

Se crea una cuenta en mblab y se crea una base de datos nueva y se crea un usuario para autenticarse a esta base de datos posteriormente se agrega la nueva direccion de la base de datos a la configuracion del proyecto

	// fileOrganizerApp/config/config.js
	.
	.
	production: {
		root: rootPath,
		app: {
			name: 'fileOrganizerApp'
		},
		port: process.env.PORT || 3000,
		db: 'mongodb://dperezg1:ubiRCH91@ds143151.mlab.com:43151/fileorganizer'
	}
	.
	.

