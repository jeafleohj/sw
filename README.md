# Proyecto StarWars - Justfile y Docker Compose

Este proyecto utiliza un `justfile` para automatizar tareas y `Docker Compose` para levantar servicios locales.

## Uso Local

### 1. Iniciar Servicios
Para ejecutar DynamoDB localmente en el puerto `8000`, usa:

```
docker-compose up -d && npm run start:dev
```

## Justfile

Este proyecto utiliza un `justfile` para automatizar tareas de construcción y despliegue en AWS.

## Comandos

### `just build`
Construye la aplicación y prepara los archivos necesarios para el despliegue:

- Elimina `tsconfig.tsbuildinfo` si existe.
- Ejecuta `npm run build` para compilar.
- Copia `package.json` y `package-lock.json` a `dist`.

Comando:
```sh
just build
```

### `just deploy`
Despliega la infraestructura en AWS utilizando AWS CDK:

- Cambia al directorio `cdk` y ejecuta `cdk deploy`.

Comando:
```sh
just deploy aws-profile
# just deploy personal
```
