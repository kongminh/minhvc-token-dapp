
# Fullstack Blockchain Project

## Overview

This project demonstrates a fullstack blockchain application including:

- **Smart Contracts**: ERC20 token contract deployed using Hardhat.
- **Backend**: Node.js/Express API to interact with the blockchain and serve data.
- **Frontend**: React app that connects to MetaMask, allowing users to mint tokens and view their token details.
- **Integration**: End-to-end flow from frontend to backend and smart contract interaction.
- **Dockerized**: Both backend and frontend are containerized with Docker, orchestrated via Docker Compose.

## Project Structure

```
/contracts       - Solidity smart contracts  
/backend         - Backend API server  
/frontend        - React frontend app  
/docker          - Docker Compose and related files  
```

## Prerequisites

- Node.js >= 16  
- npm or yarn  
- Docker & Docker Compose (if using containerization)  
- MetaMask or other EVM-compatible wallet  

## Setup & Run Locally

### Backend

```bash
cd backend
npm install
npm run start
```

### Frontend

```bash
cd frontend
npm install
npm run start
```

### Smart Contracts

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.ts --network localhost
```

## Docker Compose

To run backend and frontend in Docker containers:

```bash
docker-compose up --build
```

This will start all services and make the frontend accessible on [http://localhost:3000](http://localhost:3000).

## Assumptions & Decisions

- Using OpenZeppelin ERC20 implementation for smart contracts.
- Backend serves as an API gateway to the blockchain data.
- Frontend uses ethers.js and connects with MetaMask for wallet interactions.
- Contract deployment is done locally for development purposes.

## Known Issues

- Error handling on frontend for insufficient funds or contract errors can be improved.
- Smart contract does not include advanced tokenomics or security audits.
- Backend does not support authentication (assumes public blockchain data).

## Collaborators

Please add **apquinit** as a collaborator on your GitHub repository.

## Review Appointment

Schedule a review meeting with Alex on Calendly and provide your GitHub repository link along with any notes.

---

If you have any questions, feel free to reach out!
