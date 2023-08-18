<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Autovex</title>

    <!-- Styles -->
    @vite('resources/sass/app.scss')
</head>

<body>
    <App />
    @vite('resources/js/app.js')
</body>

</html>