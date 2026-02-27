### Install runtime dependencies
```
npm install express dotenv mongoose bcrypt jsonwebtoken cookie-parser cors axios
```

### Install dev dependencies
```
npm install -D typescript ts-node-dev @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/cookie-parser @types/cors nodemon
```

NPMs
```
npm update
npm audit
npm audit fix
```

### Typescripts
```
npx tsc --init
```


### Typescript and Node

CommonJS (require) -> ES Modules (import/export)

tsconfig.json
```
"module": "ESNext", 
```
package.json
```
"type": "module"
```


### Node Auto-Restart Tools : nodemon for ts 
```
tsx  
npm install --save-dev tsx      
tsx watch src/index.ts      
Fast, zero-config, ESM-ready

ts-node-dev 
ts-node-dev --respawn src/index.ts  
Nodemon for TS, tsconfig supported

nodemon   
nodemon src/index.ts       
Classic watch + ts-node

tsc-watch  
tsc-watch --onSuccess 
"node dist/index.js"  
Restart after compilation
```

```
HTTP request --> Express router --> wrapper(req,res,next) --> controller(req,res,next)
```