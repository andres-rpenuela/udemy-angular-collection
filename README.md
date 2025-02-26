# Curso de Udemy: Angular

* __Autor:__ _Andrés Ruiz Peñuela_
* __Contacto:__ _andres.rpenuela@babelgroup.com | andresruizpenuela@hotmail.com_
------------------------------------------------------------------------------------

## 🚀 Comandos útiles de `nvm` (Node Version Manager)


| Comando                               | Descripción                                                           |
|---------------------------------------|-----------------------------------------------------------------------|
| `nvm --version`                       | Ver la versión de `nvm` instalada                                     |
| `nvm ls-remote`                       | Listar todas las versiones de Node disponibles                        |
| `nvm ls`                              | Mostrar versiones instaladas en el sistema                            |
| `nvm install <versión>`               | Instalar una versión específica de Node                               |
| `nvm install lts`                     | Instalar la última versión LTS recomendada                            |
| `nvm use <versión>`                   | Cambiar a una versión específica de Node                              |
| `nvm alias default <versión>`         | Configurar una versión por defecto                                    |
| `nvm uninstall <versión>`             | Eliminar una versión instalada de Node                                |
| `nvm run <versión> app.js`            | Ejecutar un script con una versión específica sin cambiar la global   |
| `nvm use`                             | Activar la versión definida en el archivo `.nvmrc`                    |

## Actualizar `node` con `nvm``

1. Ver la versión actual: node -v
2. Listar versiones disponibles: nvm ls-remote
3. Instalar la nueva versión: nvm install <versión>
4. Usar la nueva versión: nvm use <versión>
5. Configurar como predeterminada: nvm alias default <versión>
6. Verificar la versión activa: node -v

## Instalancion de Angular

1. Comando para verificar si Angular CLI está instalado:
```sh
ng --version 
# ó 
ng v
```

2. Comando para verificar si está instalado globalmente con npm:
```sh
npm list -g @angular/cli
```

3. Comando para verificar si está instalado localmente en tu proyecto:
```sh
npm list @angular/cli
```


4. Si necesitas instalar Angular CLI o actualizarlo, global simplemente usa:
```sh
npm install -g @angular/cli
```

5. Si necesitas isntlar Angular CLI o actualizarlo localmente o en un proyecto
    1. Inicializar el proyecto (si aún no tienes uno):
    ```sh
    npm init -y
    ```
    2. Instalar Angular CLI localmente:
    ```sh
    npm install @angular/cli --save-dev
    ```
    3. Verificar la instalación local de Angular CLI:
    ```sh
    npx ng --version
    ```
    4. Usar los comandos de Angular CLI con npx.


```markdown
### ¿Por qué usar `npx`?

`npx` es una herramienta incluida en `npm` (_a partir de la versión 5.2.0_) que facilita la ejecución de paquetes sin necesidad de instalarlos globalmente. 

Aquí te dejo algunas razones por las cuales es útil usar `npx`:

#### Uso de paquetes locales
- Si instalas una herramienta (_como Angular CLI_) localmente en tu proyecto, `npx` ejecutará esa versión local en lugar de buscar una instalación global. _Esto garantiza que estés usando la versión específica configurada para tu proyecto._

#### Evitar instalaciones globales
- Con `npx` no es necesario instalar paquetes globalmente, lo que ayuda a evitar conflictos de versiones entre diferentes proyectos y mantiene tu sistema más limpio.

#### Ejecución inmediata
- `npx` permite ejecutar comandos de paquetes sin tener que agregarlos a tus dependencias o instalarlos de forma permanente. Esto es útil para probar herramientas o ejecutar comandos esporádicos.

#### Consistencia en el entorno de desarrollo
- Al usar `npx`, aseguras que el equipo de desarrollo y el entorno de integración utilicen la misma versión del paquete, ya que se basa en la instalación local.

#### Descarga y ejecución automáticas
- Si el paquete no está instalado, `npx` puede descargarlo temporalmente, ejecutarlo y luego eliminarlo, facilitando la ejecución de herramientas sin necesidad de instalarlas permanentemente.
```