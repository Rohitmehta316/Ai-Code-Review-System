import app from './app.js';import { connectDatabase } from './config/database.js';import { env } from './config/env.js';
try{await connectDatabase();app.listen(env.PORT,()=>console.info(`API listening at http://localhost:${env.PORT}`));}catch(e){console.error('API startup failed:',e?.name||'UnknownError');process.exit(1);}
