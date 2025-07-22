# 🚀 Guía de Despliegue en Railway - Meli Shop

## 🚂 Migración de Vercel a Railway

Este proyecto se ha migrado de Vercel a Railway para mejor rendimiento y control de la infraestructura.

## ✅ Archivos de Configuración para Railway

1. **`railway.json`** - Configuración principal de Railway
2. **`package.json`** - Scripts de build y start
3. **Variables de entorno** - Configuradas en Railway Dashboard

## 🔧 Cambios Realizados para Railway

### Servidor Express (`src/server/index.ts`)
- ✅ Rutas para `/sitemap.xml` y `/robots.txt`
- ✅ Generación dinámica de sitemap en producción
- ✅ URLs dinámicas usando `BASE_URL` para Railway
- ✅ Meta tags actualizados con URL de Railway

### Configuración de Railway
- ✅ Build automático con `npm run build`
- ✅ Start command: `npm start`
- ✅ Variables de entorno configuradas
- ✅ Dominio personalizado: `meli-shop-production.up.railway.app`

### Scripts de Build
- ✅ `build`: Build completo para producción
- ✅ `start`: Servidor de producción
- ✅ Sitemap dinámico en tiempo real

## 🚀 Cómo Desplegar en Railway

### Opción 1: Railway CLI (Recomendado)
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login a Railway
railway login

# Inicializar proyecto
railway init

# Desplegar
railway up
```

### Opción 2: GitHub Integration
1. Conecta tu repositorio a Railway
2. Railway detectará automáticamente Node.js
3. Se desplegará automáticamente en cada push a `main`

### Opción 3: Railway Dashboard
1. Ve a [railway.app](https://railway.app)
2. Crea nuevo proyecto desde GitHub
3. Selecciona este repositorio
4. Railway desplegará automáticamente

## 🌐 URLs de Producción

- **Sitio principal**: `https://meli-shop-production.up.railway.app/`
- **API productos**: `https://meli-shop-production.up.railway.app/api/products`
- **Producto individual**: `https://meli-shop-production.up.railway.app/product/1`
- **Sitemap XML**: `https://meli-shop-production.up.railway.app/sitemap.xml`
- **Robots.txt**: `https://meli-shop-production.up.railway.app/robots.txt`

## 🔍 Variables de Entorno en Railway

**IMPORTANTE:** Estas variables DEBEN configurarse en Railway Dashboard antes del deploy:

```bash
# Variables OBLIGATORIAS para Railway:
FAKESTORE_API=https://fakestoreapi.com/products
BASE_URL=https://meli-shop-production.up.railway.app
NODE_ENV=production
PORT=3000
```

### Configurar via Railway Dashboard:
1. Ve a tu proyecto en Railway
2. Clica en "Variables"
3. Agrega cada variable una por una:
   - `FAKESTORE_API` = `https://fakestoreapi.com/products`
   - `BASE_URL` = `https://meli-shop-production.up.railway.app`
   - `NODE_ENV` = `production`
   - `PORT` = `3000`

### Configurar via CLI:
```bash
railway variables set FAKESTORE_API=https://fakestoreapi.com/products
railway variables set BASE_URL=https://meli-shop-production.up.railway.app
railway variables set NODE_ENV=production
railway variables set PORT=3000
```

## ✅ Verificar que Funciona

Después del despliegue, verifica:

1. **Página principal**: `https://meli-shop-production.up.railway.app/`
2. **Página de producto**: `https://meli-shop-production.up.railway.app/product/1`
3. **API**: `https://meli-shop-production.up.railway.app/api/products`
4. **Sitemap**: `https://meli-shop-production.up.railway.app/sitemap.xml`
5. **Robots**: `https://meli-shop-production.up.railway.app/robots.txt`

## 🐛 Solución de Problemas

### Si el despliegue falla:
```bash
# Ver logs de Railway
railway logs

# Ver variables de entorno
railway variables

# Redeploy
railway up --detach
```

### Si faltan variables de entorno:
1. Verifica en Railway Dashboard
2. Asegúrate de que `BASE_URL` esté configurada
3. Confirma que `NODE_ENV=production`

### Si el sitemap no funciona:
1. Se genera automáticamente en tiempo real
2. Verifica que la API de productos esté funcionando
3. Revisa logs: `railway logs`

## 📝 Comandos Útiles de Railway

```bash
# Ver estado del proyecto
railway status

# Ver logs en tiempo real
railway logs --tail

# Abrir el proyecto en el browser
railway open

# Ver variables de entorno
railway variables

# Redeploy
railway up

# Ver dominios
railway domain

# Conectar a base de datos (si aplica)
railway connect
```

## 🔄 Migración desde Vercel

Si vienes de Vercel, estos archivos se mantienen pero no se usan en Railway:
- `vercel.json` - Solo para Vercel
- `.vercelignore` - Solo para Vercel
- `build-vercel.js` - Solo para Vercel

Railway usa:
- `railway.json` - Configuración de Railway
- `package.json` - Scripts de build y start
- Variables de entorno en Railway Dashboard

## 🚀 Ventajas de Railway vs Vercel

- ✅ **Servidor persistente**: No se duerme como en Vercel
- ✅ **Base de datos integrada**: PostgreSQL, MySQL, etc.
- ✅ **Logs en tiempo real**: Mejor debugging
- ✅ **Variables de entorno**: Más fácil de gestionar
- ✅ **Dominio custom**: Más simple de configurar
- ✅ **Builds más rápidos**: Infraestructura optimizada

---

✅ **Con Railway, el sitio tendrá mejor rendimiento y será más fácil de mantener.**
