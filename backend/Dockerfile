FROM php:8.3
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /app

RUN apt-get update -y && apt-get install -y \
    openssl \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    default-mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring zip gd \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get clean

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID user && useradd -u $UID -g $GID -ms /bin/bash user
RUN chown -R user:user /app

USER user

COPY . /app

EXPOSE 8000