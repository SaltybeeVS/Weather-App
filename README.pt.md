# WeatherSphere - Painel Meteorológico Moderno

Um aplicativo meteorológico rico em recursos com previsões em tempo real, fundos animados e componentes de interface intuitivos.

## Recursos

- **Dados meteorológicos em tempo real**
  - Temperatura e condições atuais
  - Probabilidade de precipitação por hora e dia
  - Sensação térmica
  - Velocidade e direção do vento

- **Previsões avançadas**
  - Previsão detalhada de 24 horas
  - Perspectiva estendida de 7 dias
  - Visualização da faixa de temperaturas
  - Ícones de condições meteorológicas

- **Interface interativa**
  - Suporte para geolocalização
  - Busca de cidades com autocompletar
  - Design de grade responsivo
  - Fundo animado estilo cyberpunk
  - Sistema de gerenciamento de permissões

- **Destaques técnicos**
  - Cache de solicitações API
  - Limites de erro e estados de carregamento
  - Componentes acessíveis
  - Design responsivo
  - Otimizações de desempenho

## Tecnologias utilizadas

![Tech Stack](https://skillicons.dev/icons?i=react,js,html,css,webpack,git)

- **Núcleo**
  - React 18+ (Hooks API)
  - CSS moderno (Flexbox/Grid)
  - Módulos CSS
  - Webpack 5

- **APIs e serviços**
  - [WeatherAPI.com](https://www.weatherapi.com/) (Fonte principal de dados)
  - API de geolocalização do navegador

- **Bibliotecas**
  - Axios (Cliente HTTP)
  - React Icons (Fa6)
  - Date-fns (Formatação de datas)

- **Otimizações**
  - Debouncing de solicitações
  - Cancelamento de chamadas API
  - Uso de React.memo()
  - Carregamento lento de imagens

## Instalação

1. **Pré-requisitos**
   - Node.js v16+
   - npm v8+
   - Conta no [WeatherAPI.com](https://www.weatherapi.com/) (Plano gratuito)

2. **Configuração local**
   ```bash
   git clone https://github.com/SaltybeeVS/weather-app.git
   cd weather-app
   npm install
   ```

3. **Configuração**
   Crie um arquivo `.env` no diretório raiz:
   ```env
   REACT_APP_WEATHER_API_KEY=sua_chave_api_aqui
   ```

4. **Execução**
   ```bash
   npm start
   ```

## Estrutura do projeto

```bash
src/
├── Components/
│   ├── Common/          # Componentes reutilizáveis
│   ├── DailyForecast/   # Módulo de previsão de 24 horas
│   ├── SearchInput/     # Busca de cidades com autocompletar
│   ├── SideBar/         # Painel social/informativo
│   ├── WeatherInfo/     # Visualização do clima atual
│   └── WeeklyForecast/  # Módulo de previsão de 7 dias
│
├── Services/
│   └── api.js           # Camada de serviço API
│
├── App.js               # Componente raiz
└── index.js             # Ponto de entrada
```

## Detalhes-chave de implementação

### Camada de serviço API (`api.js`)
- Configuração centralizada da API
- Manipulador de erros
- Validação de parâmetros
- Transformação de respostas

```javascript
// Exemplo de estrutura de chamada API
const axiosInstance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  params: {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    lang: 'pt',
  },
  timeout: 5000
});
```

### Recursos de desempenho
- **Debouncing de solicitações:** Atraso de 300ms na busca
- **Memoização:** Uso de React.memo e useCallback
- **Cancelamento:** AbortController para solicitações em andamento
- **Carregamento lento:** Imagens carregam ao rolar

### Segurança
- Proteção da chave API por variáveis de ambiente
- HTTPS forçado para todas as solicitações
- Sanitização de entradas para buscas
- Limites de erro para falhas de componentes

## Licença

Licença MIT - Veja [LICENSE](LICENSE) para detalhes

---

**Roteiro de melhorias potenciais**
- Adicionar índice de qualidade do ar
- Implementar sistema de alertas meteorológicos
- Criar alternância de tema (claro/escuro)
- Adicionar alternância de unidades de medida (°C/°F, km/h/mph)
- Implementar recursos PWA
- Adicionar suporte para internacionalização

**Créditos**
- Dados meteorológicos fornecidos por [WeatherAPI.com](https://www.weatherapi.com/)
- Ícones de interface de [React Icons](https://react-icons.github.io/react-icons)

---

## Outras versões do README
- [English Version](README.md)
- [Versión en Español](README.es.md)