<template>
    <section class="flex flex-row h-screen">
        <div class="hidden lg:basis-1/2 lg:block"></div>
        <div class="basis-full lg:basis-1/2 flex flex-col bg-white bg-opacity-70 backdrop-blur-xl drop-shadow-lg items-center justify-center">
            <div>
                <div class="font-sans antialiased mb-8 text-center lg:text-left">
                    <h1 class="text-4xl font-medium mb-2">Welcome</h1>
                    <p class="text-gray-500">Please enter your detail!</p>
                </div>
                <div class="w-52 lg:w-96">
                    <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert" v-if="error.isError">
                        <p class="font-medium">Error!</p>
                        <p>{{ error.errorMessage }}</p> 
                    </div>
                    <form method="post" @submit.prevent="onSubmit">
                        <div class="mb-6">
                            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                            <input type="text" name="username" v-model="form.username" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your username" required>
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" v-model="form.password" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password" required>
                        </div>
                        <div class="mb-6">
                            <button class="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                isSubmit: false,
                error: {
                    isError: false,
                    errorMessage: ''
                }
            };
        },
        methods: {
            async onSubmit() { 
                try {
                    this.cleanError();
                    const response = await axios.post(
                                `${import.meta.env.VITE_API_ADDRESS}/api/v1/auth/login`,
                                this.form, 
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    }
                                }
                            );
                    if(response && response.status == 200) {
                        this.$cookies.set('token', response.data.data.token, "1d");
                        this.$router.push({ name: 'dashboard' });
                    }
                } catch(err) {
                    console.error(err);
                    this.error.isError = true;
                    this.error.errorMessage = err.response.data.message;
                }

            },
            cleanError() {
                this.error.isError = false;
                this.error.errorMessage = '';
            }
        }
    }
</script>