# VIVOS

Versioned Interoperability to Velocitize Open Science
"InterOps" for short

## Installation

```bash
source .env
npx cdk bootstrap aws://$CDK_DEFAULT_ACCOUNT/$CDK_DEFAULT_REGION
npm run deploy
```

## VIVOS Pipes: Interoperability as Code (IOaC)

Uses `*.pipe.json` files to simultaneously solve all the most annoying aspects
of creating a fully distributed multi-vendor workflow:

1. Preventing multiple invocations
2. Communicating when a data upload is "done"
3. Identifying which files are part of a dataset
4. Chaining services together
5. Defining and distributing configuration schemas
6. Tracking service-specific lineage coherently across an entire ecosystem
