### Install runtime dependencies
```
npm install express dotenv mongoose bcrypt jsonwebtoken cookie-parser cors axios
```

### Install dev dependencies
```
npm install -D typescript ts-node-dev @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/cookie-parser @types/cors
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