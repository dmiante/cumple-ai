
# 🎉 cumple-ai

Aplicación web hecha con **Next.js** que genera felicitaciones personalizadas de cumpleaños, eventos históricos que pasaron ese dia y ofertas o actividades gratis de tiendas en tu pais.


## ✨ Características

- 🎂 **Saludo personalizado**: genera una frase de cumpleaños.  
- 📜 **Eventos históricos**: muestra hechos que ocurrieron el mismo día del cumpleaños del usuario.  
- 🎁 **Ofertas especiales**: lista promociones ficticias para complementar la experiencia.  
- ⚡ **Streaming con AI SDK de Vercel**: la respuesta llega en tiempo real.  
- 🌐 **Integración con APIs externas** (ej. Unsplash para imagenes).  
- 🎨 **UI con TailwindCSS** y tipografía **Geist** para un diseño limpio.  
- 🖥️ **Despliegue en Vercel** sin configuración extra.  

## 💻 Tecnologías Utilizadas

- [**Next.js 15**](https://nextjs.org/) con App Router
- [**Vercel AI SDK**](https://ai-sdk.dev/) para manejo de IA con streaming
- [**Tailwind CSS**](https://tailwindcss.com/) para estilos
- [**Geist Font Family**](https://vercel.com/font) fuente optimizada con next/font
- [**Sonner**](https://sonner.emilkowal.ski/) para notificaciones dentro de la app
- [**Lucide.dev**](https://lucide.dev/) para iconos
- [**zod**](https://zod.dev/) validacion de esquemas
- [**Google Gemini API**](https://ai.google.dev/) api de inteligencia artificial
- [**unsplash**](https://unsplash.com/developers) api para imagenes open source
- [**Vercel**](https://vercel.com/) despliege y alojamiento


## 🛠️ Instalación

### Prerrequisitos

- Node.js 22 o superior
- npm o pnpm

### Configuración del proyecto

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/dmiante/cumple-ai.git
   cd cumple-ai
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` y agrega tus claves de API necesarias.

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

5. **Abre la aplicación**
   Navega a [http://localhost:3000](http://localhost:3000) en tu navegador.
## 🔑 Variables de entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
GOOGLE_GENERATIVE_AI_API_KEY=tu_clave_google_gemini

API_UNSPLASH=tu_clave_unsplash
```
## ☁️ Despliegue en Vercel

Deplegado en [Vercel](https://vercel.com/)
