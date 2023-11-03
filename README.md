# WeConnect-CS-4347

## Ultimate Start
Read through this if you have time: https://bootcamp.laravel.com/

**OR**

Just go here to install the dependencies: https://herd.laravel.com/

## Tools
- VSCode
- Docker Desktop
- TablePlus

## VSCode Extensions
- https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- https://marketplace.visualstudio.com/items?itemName=xdebug.php-pack
- https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client

## Start
1. Turn on Docker Desktop
2. `cd weconnect`

Inside `weconnect` folder
  
4. `composer install`
5. `npm i`
6. Copy `.env` file below under folder `weconnect`
7. `php artisan key:generate`
8. `npm run sail -- up -d`
9. `npm run dev`

After setting up everything, the website should be up on localhost:80 (i.e. localhost).

You can run some more extra steps inside folder `weconnect`:

- Migrate database: `npm run artisan -- migrate`
- Seed database: `npm run artisan -- db:seed`
- Check database tables and data on TablePlus app by opening a new connection with the right credentials in `.env` file below

### Env File

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=weconnect
DB_USERNAME=sail
DB_PASSWORD=password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://meilisearch:7700

MEILISEARCH_NO_ANALYTICS=false
```

## Resources (No need to read)
- https://medium.com/laravel-power-devs/collaborative-development-with-laravel-f32a84040677#:~:text=Collaborative%20Development%201%201%29%20Access%20to%20remote%20repository,...%208%208%29%20Commit%20changes%20to%20Git%20
