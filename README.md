# Adoptme Main - Backend

**Adoptme Main** es un proyecto desarrollado como parte del curso de Backend en CoderHouse. El objetivo principal es construir una API RESTful para gestionar usuarios, sesiones y mascotas dentro de una aplicación orientada a la adopción de animales.

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Características](#características)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación](#instalación)
5. [Tecnologías Utilizadas](#tecnologías-utilizadas)
6. [Licencia](#licencia)

---

## Introducción

Este backend permite realizar operaciones CRUD para usuarios, gestionar sesiones de autenticación, registrar mascotas y generar solicitudes de adopción. El proyecto está diseñado siguiendo buenas prácticas de desarrollo y usando herramientas modernas para asegurar escalabilidad y mantenimiento.

## Características

- **Gestión de usuarios**: Registro, login y administración de usuarios.
- **Autenticación de sesiones**: Uso de sesiones seguras para mantener la información de los usuarios.
- **Gestión de mascotas**: Registro, listado, modificación y eliminación de mascotas disponibles para adopción.
- **Solicitudes de adopción**: Relación entre usuarios y mascotas.
- **Conexión a MongoDB**: Persistencia de datos eficiente usando Mongoose.
- **Integración de variables de entorno**: Configuración segura mediante `dotenv`.

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior).
- [MongoDB](https://www.mongodb.com/) (local o en la nube).
- [Docker](https://www.docker.com/) (opcional, para ejecutar la aplicación en un contenedor).

---

## Instalación

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/OlarteDaniel/Adoptme-main.git
    cd adoptme-main

2. **Instalar las dependencias**
    npm install

3. **Configura las variables de entorno:**
    PORT=8080
    MONGO_URL=tu_url_de_mongodb

4. **Inicia la aplicación:**
    npm start

## Tecnologías Utilizadas

1. *Node.js*
2. *Express.js*
3. *MongoDB*
4. *Mongoose*
5. *dotenv*
6. *Docker*

## Links
-Link a DockerHub: https://hub.docker.com/repository/docker/lamasdaniel/adopmecoder/general
