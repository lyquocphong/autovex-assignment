# Autovex assignment

This repository is assignment from autovex for the PHP developer position

## Getting Started

Follow the steps below to set up and configure the project on your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed:

- PHP (at least 8.1)
- Composer
- Node.js
- NPM or Yarn
- MySQL or another compatible database

### Installation

   ```bash
   git clone https://github.com/lyquocphong/autovex-assignment.git
   
   composer install

   npm install

   cp .env.example .env

   php artisan key:generate
   ```

### Sanctum Config

Set these variables in .env

SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:8000 // Change to your value
SESSION_DRIVER=cookie // It it very important, without this it will not work with sanctum

