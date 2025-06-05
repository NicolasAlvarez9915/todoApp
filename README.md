# To-Do App con Categorías (Ionic + Capacitor)

Esta aplicación es una sencilla lista de tareas (To-Do List) desarrollada con Ionic Framework. Permite a los usuarios agregar, completar, eliminar y categorizar tareas. Además, puede ejecutarse en dispositivos Android e iOS usando Capacitor.

---

## Funcionalidades

- Agregar nuevas tareas.
- Marcar tareas como completadas.
- Eliminar tareas.
- Crear, editar y eliminar categorías.
- Asignar una categoría a cada tarea.
- Filtrar tareas por categoría.

---

## Requisitos

- Node.js y npm
- Ionic CLI:
  ```bash
  npm install -g @ionic/cli


## Configuración del proyecto

1. Instala las dependencias:

npm install

2. Construye el proyecto web (se generará la carpeta `www`):


ionic build


3. Sincroniza los archivos web con Capacitor:

npx cap sync


## Ejecutar en Android

1. Abre Android Studio:

npx cap open android

2. Desde Android Studio:
   - Conecta un dispositivo o abre un emulador.
   - Haz clic en ▶️ Run para compilar y ejecutar la app.

También puedes ejecutar directamente con:

npx cap run android --target <deviceID>


## Ejecutar en iOS (solo en macOS)

1. Abre Xcode:

npx cap open ios

2. Desde Xcode:
   - Selecciona un simulador o dispositivo real.
   - Haz clic en ▶️ Run para compilar y ejecutar.

## Generar APK

1. Abre Android Studio:


npx cap open android


2. En Android Studio:
   - Ve a `Build > Build Bundle(s) / APK(s) > Build APK(s)`.
   - El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`.