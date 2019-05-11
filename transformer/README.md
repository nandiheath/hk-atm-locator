# Transform

The folder contains programs to transform, enrich, and manipulate data from API Portals and produce data in well-defined yeet standardised format

## Setup

```bash
cd transformer
npm i

#
mv .env.default .env

# Edit the .env file with the proper settings
```

## General Flow

To fetch and process the hang seng data

```bash
./src/process.js prepare hang_seng unprocessed/hang_seng.json && \
./src/process.js process hang_seng unprocessed/hang_seng.json processing/hang_seng.json && \
./src/process.js process-address hang_seng processing/hang_seng.json processed/hang_seng.json
```

```bash
./src/process.js prepare hsbc unprocessed/hsbc.json && \
./src/process.js process hsbc unprocessed/hsbc.json processing/hsbc.json

```
