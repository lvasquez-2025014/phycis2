import app from './app';
import { env } from './config/env';

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Servidor backend de Física Fundamental listo en http://localhost:${env.PORT}`);
  console.log(`📡 Health check disponible en http://localhost:${env.PORT}/api/health`);
  console.log(`🔒 Entorno: ${env.NODE_ENV} | Origen CORS: ${env.CORS_ORIGIN}`);
});

export default server;
