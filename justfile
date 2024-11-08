
# Comando para construir la aplicación
build:
  #!/bin/sh
  # Remover archivo de compilación incremental si existe
  [ -f tsconfig.tsbuildinfo ] && rm tsconfig.tsbuildinfo
  # Ejecutar el build de la aplicación
  npm run build
  # Copiar archivos de configuración necesarios a la carpeta de distribución
  cp package.json package-lock.json ./dist

# Comando para desplegar usando CDK
deploy profile:
  #!/bin/sh
  # Cambiar a la carpeta de CDK
  cd cdk
  # Desplegar la infraestructura usando el perfil 'personal'
  cdk deploy --profile {{profile}}
