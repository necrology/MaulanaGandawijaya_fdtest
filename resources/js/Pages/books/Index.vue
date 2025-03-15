<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, router } from "@inertiajs/vue3";

defineProps({ books: Array });

const deleteBook = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
        return;
    }

    try {
        await router.delete(`/books/${id}`, {
            onSuccess: () => {
                alert("Buku berhasil dihapus!");
            },
            onError: (errors) => {
                console.error("Gagal menghapus buku:", errors);
                alert("Terjadi kesalahan saat menghapus buku.");
            },
        });
    } catch (error) {
        console.error("Terjadi error:", error);
        alert("Terjadi kesalahan dalam menghapus buku.");
    }
};
</script>

<template>
    <Head title="Books" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Book Management
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="mb-4">
                    <a
                        href="/books/create"
                        class="px-4 py-2 bg-blue-500 text-white rounded ml-3"
                        >Tambah Buku</a
                    >
                </div>
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 overflow-x-auto">
                        <table
                            class="table-auto w-full border-collapse border border-gray-300"
                        >
                            <thead>
                                <tr class="bg-gray-100">
                                    <th
                                        class="border border-gray-300 px-4 py-2"
                                    >
                                        No
                                    </th>
                                    <th
                                        class="border border-gray-300 px-4 py-2"
                                    >
                                        Title
                                    </th>
                                    <th
                                        class="border border-gray-300 px-4 py-2"
                                    >
                                        Author
                                    </th>
                                    <th
                                        class="border border-gray-300 px-4 py-2"
                                    >
                                        Rating
                                    </th>
                                    <th
                                        class="border border-gray-300 px-4 py-2"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <template v-if="books.length > 0">
                                <tbody>
                                    <tr
                                        v-for="(book, index) in books"
                                        :key="book.id"
                                        @click="router.visit(`/books/${book.id}`)"
                                        class="cursor-pointer hover:bg-gray-200"
                                    >
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            {{ index + 1 }}
                                        </td>
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            {{ book.title }}
                                        </td>
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            {{ book.author }}
                                        </td>
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            {{ book.rating }} ⭐
                                        </td>
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            <button
                                                @click.stop="
                                                    router.visit(
                                                        `/books/${book.id}/edit`
                                                    )
                                                "
                                                class="text-yellow-500"
                                            >
                                                Edit
                                            </button>
                                            &nbsp;&nbsp;
                                            <button
                                                @click.stop="deleteBook(book.id)"
                                                class="text-red-500"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                            <!-- Tampilkan pesan jika data kosong -->
                            <tbody v-else>
                                <tr>
                                    <td
                                        colspan="5"
                                        class="border border-gray-300 px-4 py-2 text-center"
                                    >
                                        Data tidak ada.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
