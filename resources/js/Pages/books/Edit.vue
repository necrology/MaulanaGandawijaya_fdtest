<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import InputLabel from "@/Components/InputLabel.vue";
import { Head, router } from "@inertiajs/vue3";
import { ref } from "vue";

const props = defineProps({
    book: Object,
});

const form = ref({
    title: props.book.title,
    author: props.book.author,
    description: props.book.description,
    thumbnail: props.book.thumbnail,
    rating: props.book.rating,
});

const updateBook = async () => {
    try {
        await router.put(`/books/${props.book.id}`, form.value, {
            onSuccess: () => {
                alert("Buku berhasil diperbarui!");
                router.visit("/books"); // Redirect ke halaman daftar buku
            },
            onError: (errors) => {
                console.error("Gagal memperbarui buku:", errors);
                alert("Terjadi kesalahan saat memperbarui buku.");
            },
        });
    } catch (error) {
        console.error("Terjadi error:", error);
        alert("Terjadi kesalahan dalam mengupdate buku.");
    }
};
</script>

<template>
    <Head title="Edit Buku" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Edit Buku
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <form @submit.prevent="updateBook" class="space-y-4">
                            <div>
                                <InputLabel for="title" value="Title" />
                                <input
                                    id="title"
                                    type="text"
                                    class="mt-1 block w-full rounded"
                                    v-model="form.title"
                                    required
                                    autofocus
                                    autocomplete="title"
                                    placeholder="Judul Buku"
                                />
                            </div>
                            <div>
                                <InputLabel for="author" value="Author" />
                                <input
                                    id="author"
                                    type="text"
                                    class="mt-1 block w-full rounded"
                                    v-model="form.author"
                                    required
                                    autofocus
                                    autocomplete="author"
                                    placeholder="Nama Penulis"
                                />
                            </div>
                            <div>
                                <InputLabel for="description" value="Description" />
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    placeholder="Deskripsi Buku"
                                    required
                                    autofocus
                                    autocomplete="description"
                                    class="mt-1 block w-full rounded"
                                ></textarea>
                            </div>
                            <div>
                                <InputLabel for="thumbnail" value="Thumbnail" />
                                <input
                                    id="thumbnail"
                                    type="text"
                                    class="mt-1 block w-full rounded"
                                    v-model="form.thumbnail"
                                    required
                                    autofocus
                                    autocomplete="thumbnail"
                                    placeholder="URL Gambar Buku"
                                />
                            </div>
                            <div>
                                <InputLabel for="rating" value="Rating" />
                                <input
                                    id="rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    class="mt-1 block w-full rounded"
                                    v-model="form.rating"
                                    required
                                    autofocus
                                    placeholder="Rating (1-5)"
                                    autocomplete="rating"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    class="px-4 py-2 bg-blue-500 text-white rounded mt-4"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
