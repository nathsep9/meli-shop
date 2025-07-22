# 🚀 Guía de Despliegue en Vercel - Meli Shop

## ❌ Problema Solucionado: "Not Found" en Vercel

Se han agregado las configuraciones necesarias para que el sitio funcione correctamente en Vercel.

## ✅ Archivos de Configuración Añadidos

1. **`vercel.json`** - Configuración principal de Vercel
2. **`build-vercel.js`** - Script de build para producción
3. **`.vercelignore`** - Archivos a excluir del despliegue

## 🔧 Cambios Realizados

### Servidor Express (`src/server/index.ts`)
- ✅ Agregadas rutas para `/sitemap.xml` y `/robots.txt`
- ✅ Generación dinámica de sitemap en producción
- ✅ URLs dinámicas para desarrollo y producción
- ✅ Meta tags actualizados con URLs correctas

### Configuración de Vercel (`vercel.json`)
- ✅ Rutas configuradas para Express
- ✅ Archivos estáticos mapeados correctamente
- ✅ Variables de entorno para producción

### Scripts de Build
- ✅ `vercel-build`: Build automático para Vercel
- ✅ `build-vercel.js`: Genera sitemap con URL de producción

## 🚀 Cómo Desplegar

### Opción 1: Vercel CLI (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde el directorio del proyecto
vercel

# Para deploys subsecuentes
vercel --prod
```

### Opción 2: GitHub Integration
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente la configuración
3. Se desplegará automáticamente en cada push

## 🌐 URLs Después del Despliegue

- **Sitio principal**: `https://tu-dominio.vercel.app/`
- **API productos**: `https://tu-dominio.vercel.app/api/products`
- **Producto individual**: `https://tu-dominio.vercel.app/product/1`
- **Sitemap XML**: `https://tu-dominio.vercel.app/sitemap.xml`
- **Robots.txt**: `https://tu-dominio.vercel.app/robots.txt`

## 🔍 Variables de Entorno en Vercel

Configurar en el dashboard de Vercel:

```
FAKESTORE_API=https://fakestoreapi.com/products
BASE_URL=https://tu-dominio-real.vercel.app
NODE_ENV=production
```

## ✅ Verificar que Funciona

Después del despliegue, verifica:

1. **Página principal**: Debe cargar la lista de productos
2. **Página de producto**: `https://tu-dominio.vercel.app/product/1`
3. **API**: `https://tu-dominio.vercel.app/api/products`
4. **Sitemap**: `https://tu-dominio.vercel.app/sitemap.xml`
5. **Robots**: `https://tu-dominio.vercel.app/robots.txt`

## 🐛 Solución de Problemas

### Si sigue dando "Not Found":
1. Verifica que `vercel.json` esté en la raíz del proyecto
2. Asegúrate de que el build se complete sin errores
3. Revisa los logs en el dashboard de Vercel

### Si faltan archivos estáticos:
1. Verifica que la carpeta `public/` esté incluida
2. Revisa las rutas en `vercel.json`

### Si el sitemap no funciona:
1. Se genera automáticamente en tiempo real
2. No requiere archivos físicos en producción

## 📝 Comandos Útiles

```bash
# Build local para probar
npm run build:vercel

# Test local
npm run dev

# Deploy a Vercel
vercel --prod

# Ver logs de Vercel
vercel logs [deployment-url]
```

---

✅ **Con estos cambios, el error "Not Found" en Vercel debería estar solucionado.**
