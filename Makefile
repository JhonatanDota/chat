build:
	docker-compose build --no-cache

up:
	docker-compose up

down:
	docker-compose down

setup:
	docker-compose exec backend bash -c "php artisan migrate:fresh"

load:
	docker-compose exec backend bash -c "php artisan db:seed --class=DevelopmentSeeder"

sh:
	docker-compose exec backend bash

sh-front:
	docker-compose exec frontend bash

test-back:
	docker-compose exec backend bash -c "php artisan test"

tinker:
	docker-compose exec backend bash -c "php artisan tinker"

lint-front:
	docker-compose exec frontend bash -c "npm run lint"