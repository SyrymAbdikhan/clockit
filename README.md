# ClockIt

Simple countup app 

## TechStack

- **[React](https://reactjs.org/)** (with Typescript)
- **[Docker Compose](https://docs.docker.com/compose/)** for development
- **[Traefik](https://traefik.io/traefik)** as a reverse proxy
- **[Shadcn](https://ui.shadcn.com/)** for clean and beautiful components
  - **[Lucide](https://lucide.dev/)** for icons

## Prerequisites

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Docker](https://docs.docker.com/desktop/) (optional)

## Quick Start

**Clone the repo**

```
git clone https://github.com/SyrymAbdikhan/clockit
cd clockit
```

**Run with vite**

```
npm run preview
```

**Or run with Docker** in production server.

First copy `.env.example` file to `.env` and replace placeholders.

Then create a network named `web`:

```
docker network create web
```

Finaly, run the application

```
docker compose up -d --build
```
