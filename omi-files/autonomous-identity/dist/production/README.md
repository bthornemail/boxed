# AI Persistence Core Package - Production Build

This is the production build of the AI Persistence Core Package, providing the foundation for AI persistence.

## Quick Start

```bash
npm install
npm start
```

## Features

- ✅ Complete AI Persistence Core
- ✅ File-Based Storage
- ✅ Memory System Integration
- ✅ Identity Management
- ✅ Security Framework

## Usage

```javascript
const { AIPersistenceCore, DEFAULT_CONFIG } = require('@h2gnn/ai-persistence-core-production');

// Create AI persistence instance
const aiPersistence = AIPersistenceCore.create(DEFAULT_CONFIG);

// Initialize
await aiPersistence.initialize();

// Use the system
await aiPersistence.storeMemory({
  type: 'semantic',
  content: 'Hello, AI!',
  metadata: { source: 'user', quality: 0.9 }
});
```

## License

MIT
