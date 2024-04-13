<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            background-image: linear-gradient(45deg, #f3e7e9 0%, #c7d3d4 100%);
        }
    </style>
</head>

<body class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
    <div class="bg-gray-200 rounded-lg shadow-lg p-8 max-w-md w-full space-y-6">
        <div class="flex justify-center">
            <img src="{{ asset('assests/image/logo.jpeg') }}" alt="logo" width="100" class="rounded-full">
        </div>
        <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Login
        </h2>
        <form action="{{ route('admin.login.post') }}" method="post" class="space-y-4">
            @csrf
            <div>
                <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email</label>
                <input id="email" type="email" class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5" name="email" value="" required placeholder="Please fill in your email">
                @error('email')
                <div class="text-red-500 mt-2">{{ $message }}</div>
                @enderror
            </div>
            <div>
                <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Password</label>
                <input id="password" type="password" class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5" name="password" required placeholder="Please fill in your password">
                @error('password')
                <div class="text-red-500 mt-2">{{ $message }}</div>
                @enderror
            </div>
            <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Login
                    </button>
                </span>
            </div>
        </form>
    </div>
</body>

</html>
