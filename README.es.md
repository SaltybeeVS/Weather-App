#  Modern Weather Dashboard

Una aplicación meteorológica con pronósticos en tiempo real, fondos animados y componentes de interfaz intuitivos.

## Características

- **Datos meteorológicos en tiempo real**
  - Temperatura y condiciones actuales
  - Probabilidad de precipitación por hora y día
  - Sensación térmica
  - Velocidad y dirección del viento

- **Pronósticos avanzados**
  - Pronóstico detallado de 24 horas
  - Perspectiva extendida de 7 días
  - Visualización del rango de temperaturas
  - Iconos de condiciones meteorológicas

- **Interfaz interactiva**
  - Soporte para geolocalización
  - Búsqueda de ciudades con autocompletado
  - Diseño de cuadrícula responsivo
  - Fondo animado estilo cyberpunk
  - Sistema de gestión de permisos

- **Aspectos técnicos destacados**
  - Caché de solicitudes API
  - Límites de error y estados de carga
  - Componentes accesibles
  - Diseño responsivo
  - Optimizaciones de rendimiento

## Tecnologías utilizadas

![Tech Stack](https://skillicons.dev/icons?i=react,js,html,css,webpack,git)

- **Núcleo**
  - React 18+ (Hooks API)
  - CSS moderno (Flexbox/Grid)
  - Módulos CSS
  - Webpack 5

- **APIs y servicios**
  - [WeatherAPI.com](https://www.weatherapi.com/) (Fuente principal de datos)
  - API de geolocalización del navegador

- **Librerías**
  - Axios (Cliente HTTP)
  - React Icons (Fa6)
  - Date-fns (Formateo de fechas)

- **Optimizaciones**
  - Debouncing de solicitudes
  - Cancelación de llamadas API
  - Uso de React.memo()
  - Carga diferida de imágenes

## Instalación

1. **Requisitos previos**
   - Node.js v16+
   - npm v8+
   - Cuenta en [WeatherAPI.com](https://www.weatherapi.com/) (Plan gratuito)

2. **Configuración local**
   ```bash
   git clone https://github.com/SaltybeeVS/weather-app.git
   cd weather-app
   npm install
   ```

3. **Configuración**
   Crea un archivo `.env` en el directorio raíz:
   ```env
   REACT_APP_WEATHER_API_KEY=tu_clave_api_aquí
   ```

4. **Ejecución**
   ```bash
   npm start
   ```

## Estructura del proyecto

```bash
src/
├── Components/
│   ├── Common/          # Componentes reutilizables
│   ├── DailyForecast/   # Módulo de pronóstico de 24 horas
│   ├── SearchInput/     # Búsqueda de ciudades con autocompletado
│   ├── SideBar/         # Panel social/informativo
│   ├── WeatherInfo/     # Visualización del clima actual
│   └── WeeklyForecast/  # Módulo de pronóstico de 7 días
│
├── Services/
│   └── api.js           # Capa de servicio API
│
├── App.js               # Componente raíz
└── index.js             # Punto de entrada
```

## Detalles clave de implementación

### Capa de servicio API (`api.js`)
- Configuración centralizada de la API
- Manejador de errores
- Validación de parámetros
- Transformación de respuestas

```javascript
// Ejemplo de estructura de llamada API
const axiosInstance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  params: {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    lang: 'es',
  },
  timeout: 5000
});
```

### Características de rendimiento
- **Debouncing de solicitudes:** Retardo de 300ms en la búsqueda
- **Memoización:** Uso de React.memo y useCallback
- **Cancelación:** AbortController para solicitudes en vuelo
- **Carga diferida:** Imágenes cargan al hacer scroll

### Seguridad
- Protección de clave API mediante variables de entorno
- HTTPS forzado para todas las solicitudes
- Saneamiento de entradas para búsquedas
- Límites de error para fallos de componentes

## Licencia

Licencia MIT - Ver [LICENSE](LICENSE) para más detalles

---

**Hoja de ruta de mejoras potenciales**
- Añadir índice de calidad del aire
- Implementar sistema de alertas meteorológicas
- Crear cambio de tema (claro/oscuro)
- Añadir cambio de unidades de medida (°C/°F, km/h/mph)
- Implementar características PWA
- Añadir soporte para internacionalización

**Créditos**
- Datos meteorológicos proporcionados por [WeatherAPI.com](https://www.weatherapi.com/)
- Iconos de interfaz de [React Icons](https://react-icons.github.io/react-icons)

---

## Otras versiones del README
- [English Version](README.md)
- [Versão em Português](README.pt.md)
