# NoteApp

## Installation
```bash
git clone git@github.com:mrcyna/note-app.git
cd note-app
cp .env.example .env
npm install
npm run start
```

## Build a new image
```bash
# Build
npm run build
docker build . -t mrcyna/noteapp:latest --no-cache
docker push mrcyna/noteapp:latest

# Run on the fly (memory)
docker container run --name noteapp --rm -p 3322:4000 -e APP_PORT=4000 -e APP_STORAGE=memory  mrcyna/noteapp:latest
# Run on the fly (mongodb required)
docker container run --name noteapp --rm -p 3322:4000 -e APP_PORT=4000 -e APP_STORAGE=mongodb -e MONGODB_URL=mongodb://host.docker.internal:27017  mrcyna/noteapp:latest
```