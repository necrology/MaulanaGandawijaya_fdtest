<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, router } from "@inertiajs/vue3";

const props = defineProps({
    book: Object,
});

const goBack = () => {
    router.visit("/books");
};
</script>

<template>
    <Head title="Detail Buku" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Detail Buku
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-4xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <div class="flex space-x-6">
                            <img
                                :src="book.thumbnail"
                                alt="Cover Buku"
                                class="w-40 h-60 rounded shadow-md"
                            />
                            <div class="space-y-4">
                                <h3 class="text-2xl font-bold">{{ book.title }}</h3>
                                <p class="text-gray-600">Penulis: {{ book.author }}</p>
                                <p class="text-gray-700">{{ book.description }}</p>
                                <p class="text-yellow-500">
                                    Rating: ⭐ {{ book.rating }}/5
                                </p>
                                <button
                                    @click="goBack"
                                    class="px-4 py-2 bg-gray-500 text-white rounded"
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
