Prerequisites
- Manim should be installed and working. You can check this by running `manim --version` in your terminal.

## Setting up the backend

1. Clone the repository

```bash
git clone https://github.com/ezhil56x/text2video.git
```

2. Go to backend directory

```bash
cd text2video/backend
```

3. Copy .env.example to .env

```bash
cp .env.example .env
```

4. Install dependencies

```bash
npm i
```

5. Start a posgres container

```bash
docker run --name text2video-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=text2video \
  -p 5432:5432 \
  -d postgres
```

## Setting up the frontend

1. Go to frontend directory

```bash
cd text2video/frontend
```

2. Install dependencies

```bash
npm i
```

3. Start the frontend

```bash
npm run dev
```
