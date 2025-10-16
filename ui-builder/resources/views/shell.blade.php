<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UI Builder - {{ $pageKey }}</title>
    @vite(['resources/css/app.css'])
</head>
<body>
    <div id="root"
         data-page-key="{{ $pageKey }}"
         data-is-authenticated="{{ $isAuthenticated ? 'true' : 'false' }}"
         data-has-users="{{ $hasUsers ? 'true' : 'false' }}"
         @if($isAuthenticated)
         data-user="{{ json_encode($user) }}"
         @endif
    ></div>
    
    @vite('resources/js/main.tsx')
</body>
</html>
