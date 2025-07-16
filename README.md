# DrawSync 🎨

A collaborative drawing application inspired by Excalidraw, built with modern web technologies for real-time sketch collaboration.

## ✨ Features

- **Intuitive Drawing Tools**: Freehand drawing, shapes, text, and arrows
- **Real-time Collaboration**: Multiple users can draw simultaneously
- **Hand-drawn Style**: Sketchy, hand-drawn aesthetic for natural-looking diagrams
- **Export Options**: Save your work in various formats
- **Responsive Design**: Works seamlessly across devices
- **Undo/Redo**: Full history management for drawing operations
- **Layer Management**: Organize elements with proper layering
- **Color Palette**: Customizable colors for different elements

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: CSS Modules / Tailwind CSS
- **Canvas Rendering**: HTML5 Canvas API

### Backend & DB
- **Framework**: [Node JS](https://nodejs.org/en) & [ws library](https://www.npmjs.com/package/ws)
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)

### Development Tools
- **Monorepo**: [Turborepo](https://turbo.build/) - High-performance build system
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Linting**: [ESLint](https://eslint.org/) - Code quality and consistency
- **Formatting**: [Prettier](https://prettier.io/) - Opinionated code formatter
- **Type Checking**: TypeScript for static type checking

### Architecture
- **Monorepo Structure**: Shared components and configurations
- **Component Library**: Reusable UI components (`@repo/ui`)
- **Shared Configuration**: ESLint and TypeScript configs across packages

## 📦 Project Structure

```
DrawSync/
├── apps/
│   ├── client/                      # Main drawing application
│   └── http-backend/                # HTTP backend
│   └── ws-backend/                  # Web Socket backend using 
├── packages/
│   ├── backend-common/         # Common backend config
│   ├── common/                 # Common types for both backend & Frontend
│   ├── db/                     # Prisma Config
│   ├── ui/                     # Shared UI components
│   ├── eslint-config/          # ESLint configuration
│   └── typescript-config/      # TypeScript configuration
├── package.json
├── turbo.json
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js 16+ 
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhargavdash/DrawSync.git
   cd DrawSync
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to start drawing!

## 🏗️ Available Scripts

- `pnpm dev` - Start development servers for all apps
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## 🎯 Usage

1. **Basic Drawing**: Select a tool from the toolbar and start drawing on the canvas
2. **Shapes**: Choose from rectangle, circle, arrow, and line tools
3. **Text**: Add text elements by selecting the text tool and clicking on the canvas
4. **Colors**: Change stroke and fill colors using the color palette
5. **Export**: Save your drawings as PNG, SVG, or JSON files
6. **Collaboration**: Share the session link with others for real-time collaboration

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Turborepo Configuration
The project uses Turborepo for efficient builds and caching. Configuration is managed in `turbo.json`.



## 🙏 Acknowledgments

- [Excalidraw](https://excalidraw.com/) - Inspiration for the drawing interface
- [Next.js](https://nextjs.org/) - React framework
- [Turborepo](https://turbo.build/) - Monorepo toolchain

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub Issues](https://github.com/bhargavdash/DrawSync/issues)

## 🗺️ Roadmap

- [ ] Real-time collaboration with WebSockets
- [ ] Advanced shape tools
- [ ] Layer management system
- [ ] Plugin architecture
- [ ] Mobile app support
- [ ] Cloud storage integration

---

**Built by [Bhargav Dash](https://github.com/bhargavdash)**