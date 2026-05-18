# 📁 Estructura del Proyecto

## Arquitectura Feature-Based con Shared Utilities

```
src/
├── features/              # Módulos por dominio (productos, ingredientes, etc.)
│   └── products/
│       ├── components/    # Componentes específicos del módulo
│       ├── hooks/         # Custom hooks (queries, mutations)
│       ├── pages/         # Páginas/rutas del módulo
│       ├── services/      # Llamadas a la API (axios)
│       └── types.ts       # Interfaces y tipos del módulo
│
├── shared/                # Componentes y utilidades reutilizables
│   ├── components/        # Botones, modales, loaders, etc.
│   ├── hooks/             # useAuth, useLocalStorage, etc.
│   └── utils/             # Formatters, validators, helpers, etc.
│
├── store/                 # Estado global Zustand
├── router/                # Configuración de rutas
├── App.tsx
├── main.tsx
└── index.css
```

## Principios de Organización

### 📦 **Features**
- Cada feature (módulo) es independiente y contiene todo lo que necesita
- Estructura dentro de cada feature:
  - **components/**: Componentes UI específicos de la feature
  - **hooks/**: Custom hooks para queries (TanStack Query) y lógica de la feature
  - **pages/**: Componentes de página/ruta
  - **services/**: Llamadas a API específicas de la feature
  - **types.ts**: Tipos/interfaces del dominio

### 🔄 **Shared**
- Componentes y utilidades reutilizables en múltiples features
- Nunca importa desde features
- Fácil de escalar y mantener

### 💾 **Store**
- Estado global con Zustand
- Estructura: un store por entidad o contexto
- Ejemplo: `useAppStore.ts`, `useUserStore.ts`

### 🛣️ **Router**
- Configuración centralizada de rutas
- Utiliza React Router v6

## 📚 Dependencias Configuradas

- **React Router DOM**: Enrutamiento
- **TanStack React Query**: Gestión de estado de servidor
- **Axios**: Cliente HTTP
- **Zustand**: Estado global
- **Tailwind CSS**: Estilos

## 🚀 Cómo Agregar una Nueva Feature

1. Crea una carpeta en `features/` con el nombre de tu feature
2. Dentro crea: `components/`, `hooks/`, `pages/`, `services/`
3. Define `types.ts` con tus interfaces
4. Agrega la ruta en `router/routes.tsx`
5. Importa lo que necesites desde `shared/`

Ejemplo:
```bash
src/features/ingredients/
├── components/
├── hooks/
├── pages/
├── services/
└── types.ts
```

## 📋 Ejemplo de Importación

```tsx
// ✅ Bien
import { ProductCard } from '@/features/products/components'
import { useProducts } from '@/features/products/hooks'
import { Button } from '@/shared/components'
import { formatPrice } from '@/shared/utils'

// ❌ Mal
import ProductCard from '@/features/products/components/ProductCard.tsx'
```

---

**¡Listo para crecer! 🚀**
