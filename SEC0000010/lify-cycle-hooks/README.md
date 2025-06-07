# LifyCycleHooks

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


--

# 

Usar nvm

✅ 1. Verifica que tienes nvm instalado

nvm --version


Si no está instalado, puedes instalarlo desde su repositorio oficial:
👉 https://github.com/nvm-sh/nvm

✅ 2. Instala la última versión LTS de Node.js

nvm install --lts

Esto descargará e instalará la versión LTS más reciente disponible (por ejemplo, v20.x.x en mayo 2025).

✅ 3. Usa esa versión como predeterminada
nvm use --lts
nvm alias default lts/*

Esto hace que cada nueva terminal use automáticamente la versión LTS que acabas de instalar.

✅ 4. Verifica la instalación
node -v
npm -v

👉 Ejecuta el CLI de Angular (ng) temporalmente, incluso si no lo tienes instalado globalmente.

--- 

# Usar Angular CLI con npx

El comando:  `npx --package @angular/cli ng`, hace lo siguiente:

🔍 ¿Qué significa?
npx: Ejecuta paquetes npm sin necesidad de instalarlos globalmente.

--package @angular/cli: Le dice a npx que use (o descargue temporalmente) el paquete @angular/cli.

ng: Es el comando de la Angular CLI que quieres ejecutar.

🧠 ¿Qué logra?
👉 Ejecuta el CLI de Angular (ng) temporalmente, incluso si no lo tienes instalado globalmente.

Por ejemplo:

```bash
npx --package @angular/cli ng new my-app
```

➡️ Esto genera un nuevo proyecto Angular usando la última versión de @angular/cli, sin necesidad de instalarlo globalmente con npm install -g.

✅ Ventajas
Siempre usas la versión más actual de Angular CLI.

Evitas conflictos si tienes versiones antiguas globales.

Útil en entornos CI/CD o cuando trabajas con múltiples proyectos Angular de distintas versiones.

🔁 Consejo
Puedes hacer lo mismo más corto:

```bash
npx @angular/cli new my-app
```
(npx detecta automáticamente que quieres correr ng)

Ejemplo con propiedades:
```bash
npx --yes --package @angular/cli@latest ng new lify-cycle-hooks-app --standalone --routing --style=css --strict --skip-tests --defaults
```


--

# LifeCycle Hooks

Cundo un componente/directiva es creado, Angular ejecuta una serie de métodos en un orden específico. Estos métodos son conocidos como "LifeCycle Hooks" y permiten a los desarrolladores engancharse en diferentes etapas del ciclo de vida del componente/directiva.

Si cuenta con algún metodo cuyo nombre coinida con los hooks, Angular lo ejecutará automáticamente en el momento adecuado, sin necesidad de invocarlo manualmente e implementando la interfaz correspondiente.

Hooks disponibles: [Link](https://angular.dev/guide/components/lifecycle)

Aquí tienes una **redacción clara y profesional** sobre los *ciclos de vida en Angular*, con **ejemplos prácticos**, su **uso recomendado**, y **en qué parte del framework se ejecutan**:

---

## 🌀 Ciclo de Vida en Angular

Angular proporciona una serie de *hooks* (métodos) que permiten a los componentes y directivas reaccionar en diferentes momentos de su existencia: desde su creación, detección de cambios, renderizado y destrucción.

---

### 🔹 **Creation Phase**

#### `constructor()`

* **Cuándo se ejecuta:** Inmediatamente al crear la instancia del componente o directiva.
* **Para qué se usa:** Inyección de dependencias. No se recomienda inicializar lógica pesada aquí (como llamadas HTTP).
* **Zona:** Fase previa al ciclo de detección de cambios.

**Ejemplo:**

```ts
constructor(private userService: UserService) {}
```

---

### 🔹 **Change Detection Phase**

#### `ngOnInit()`

* **Cuándo:** Después de que Angular ha inicializado todas las propiedades de entrada.
* **Para qué:** Inicializar datos, ejecutar llamadas a servicios o configurar lógica basada en inputs.
* **Zona:** Tradicional (NgZone) o zoneless.

```ts
ngOnInit() {
  this.userService.getUsers().subscribe(users => this.users = users);
}
```

---

#### `ngOnChanges(changes: SimpleChanges)`

* **Cuándo:** Cuando cambian propiedades `@Input()`.
* **Para qué:** Reaccionar a cambios específicos de inputs.
* **Zona:** Funciona tanto en zoneless como en zona tradicional.

```ts
@Input() title: string;

ngOnChanges(changes: SimpleChanges) {
  if (changes['title']) {
    console.log('Nuevo título:', changes['title'].currentValue);
  }
}
```

---

#### `ngDoCheck()`

* **Cuándo:** Cada vez que Angular ejecuta la detección de cambios.
* **Para qué:** Personalizar la detección de cambios (más detallado que `ngOnChanges`).
* **Zona:** Compatible con zoneless.

```ts
ngDoCheck() {
  console.log('Verificando manualmente el componente');
}
```

---

### 🔹 **Content Projection**

#### `ngAfterContentInit()`

* **Cuándo:** Una vez que Angular ha proyectado contenido externo en el componente (ng-content).
* **Zona:** Después de la primera verificación de contenido.

```ts
ngAfterContentInit() {
  console.log('Contenido proyectado inicializado');
}
```

#### `ngAfterContentChecked()`

* **Cuándo:** Después de cada verificación del contenido proyectado.
* **Zona:** Detección continua.

---

### 🔹 **View Initialization**

#### `ngAfterViewInit()`

* **Cuándo:** Una vez que la vista del componente (y sus hijos) ha sido inicializada.
* **Para qué:** Ideal para acceder a `@ViewChild`.
* **Zona:** Se ejecuta una vez.

```ts
@ViewChild('inputRef') input!: ElementRef;

ngAfterViewInit() {
  this.input.nativeElement.focus();
}
```

#### `ngAfterViewChecked()`

* **Cuándo:** Cada vez que la vista (o sus hijos) es verificada.
* **Para qué:** Actualizar UI después de renderizado.
* **Zona:** Cada ciclo de verificación.

---

### 🔹 **Rendering (Standalone Signals Only)**

#### `afterNextRender`

* **Cuándo:** Después del siguiente render completo de la vista.
* **Zona:** Signals / Zoneless.

#### `afterEveryRender`

* **Cuándo:** En cada render completo.
* **Zona:** Signals / Zoneless.

---

### 🔹 **Destruction Phase**

#### `ngOnDestroy()`

* **Cuándo:** Justo antes de que el componente/directiva sea destruido.
* **Para qué:** Cancelar suscripciones, limpiar timers, destruir observables.
* **Zona:** Final del ciclo de vida.

```ts
subscription!: Subscription;

ngOnInit() {
  this.subscription = this.service.getData().subscribe();
}

ngOnDestroy() {
  this.subscription.unsubscribe();
  console.log('Componente destruido');
}
```

---

## ✅ Recomendaciones:

* Usa `constructor` solo para inyecciones.
* Inicializa lógica en `ngOnInit`.
* Controla recursos en `ngOnDestroy`.
* Usa `ngOnChanges` si dependes de `@Input()`.
* No abuses de `ngDoCheck`, puede afectar rendimiento.

¿Quieres que te genere una plantilla base con todos estos hooks listos para usar?

# Constructor
Se ejecuta al crear la instancia del componente/directiva. Ideal para inyectar dependencias.


Ejecuion:

* HomePageComponent initialized and created constructor() home-page.component.ts:12:12
* HomePageComponent ngOnInit() called home-page.component.ts:18:12
* ngDoCheck called home-page.component.ts:27:12
* ngAfterContentInit called home-page.component.ts:32:12
* ngAfterContentChecked called home-page.component.ts:37:12
* ngAfterViewInit called home-page.component.ts:42:12
* ngAfterViewChecked called home-page.component.ts:47:12
