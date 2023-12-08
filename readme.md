## MEAN PROJECT
Repository ini digunakan dalam materi perkuliahan Pemrograman Aplikasi Web II tentang MEAN Stack Development. Terdapat 2 buah project Fullstack development, yakni project ```lac8r``` yang merupkan backend dari aplikasi web yang dikembangkan menggunakan NodeJS, Express dan MongoDB.
Sedangkan frontend aplikasi web pada project ini menggunakan framework angular. 

### Project Backend
1. Masuk ke folder ```lac8r``` melalui terminal
2. Jalankan ```npm install``` untuk menginstall semua dependensi yang dibutuhkan
3. Jalankan ```npm run start``` untuk menjalankan server atau ``npm run dev`` untuk mode development
4. Pastikan anda telah menginstall nodemon jika menjalankan perintah ``npm run dev``

### Project Frontend
Pastikan anda telah menginstall angular cli. Jika belum jalankan perintah ``npm install -g @angular/cli`` untuk menginstall angular cli secara global
1. Masuk ke folder ```frontend``` melalui terminal
2. Jalankan ```npm install``` untuk menginstall semua dependensi yang dibutuhkan
3. Jalankan ``ng server`` untuk menjalankan angular server


### Menggunakan Docker Development Environments
Anda dapat membuka sampel ini di fitur Lingkungan Pengembang Docker Desktop versi 4.12 atau lebih baru.

[Open in Docker Dev Environments ](https://open.docker.com/dashboard/dev-envs?url=https://github.com/Web-Programming/express-project-nurrachmat)

#### Aplikasi MEAN dengan backend NodeJS dan database MongoDB
Project structure:
```
.
├── data
├── lac8r
│   ├── Dockerfile
│   ...
├── compose.yaml
├── frontend
│   ├── ...
│   └── Dockerfile
└── README.md
```

## Deploy with docker compose
```
docker compose up -d
```


[_compose.yaml_](compose.yaml)
```
services:
  frontend:
      build:
        context: frontend
        target: builder
      ports:
        - 4200:4200
      stdin_open: true
      volumes:
        - ./frontend:/project
        - /project/node_modules
      restart: always
      networks:
        - angular-express
      depends_on:
        - backend
        
  backend:
    restart: always
    build:
      context: lac8r
      target: development
    volumes:
      - ./lac8r:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      - mongo
    networks:
      - express-mongo
      - angular-express
    expose: 
      - 3000
    ports:
      - 3002:3000

  mongo:
    restart: always
    image: mongo:6.0
    volumes:
      - ./data:/data/db
    networks:
      - express-mongo
    expose:
      - 27018
    ports:
      - 27018:27017
      
networks:
  angular-express:
  express-mongo:
```