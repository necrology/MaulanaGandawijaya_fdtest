<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";

defineProps({
    user: Object,
});
</script>

<template>
    <Head title="Home Page" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Home Page
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">You're logged in!</div>
                    <div class="p-6 text-gray-900">
                        <p><strong>Nama : </strong> {{ user.name }}</p>
                        <p><strong>Email : </strong> {{ user.email }}</p>
                        <p>
                            <strong>Status Verifikasi : </strong>
                            <span
                                :class="
                                    user.email_verified_at
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                "
                            >
                                {{
                                    user.email_verified_at
                                        ? "Terverifikasi"
                                        : "Belum Diverifikasi"
                                }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
