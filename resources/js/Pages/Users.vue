<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, router } from "@inertiajs/vue3";
import { ref } from "vue";

defineProps({
    users: Object,
    status: String,
    search: String,
});

const filter = ref("");
const searchQuery = ref("");

const applyFilter = () => {
    router.get(
        "/users",
        {
            status: filter.value,
            search: searchQuery.value,
        },
        { preserveState: true, replace: true }
    );
};
</script>

<template>
    <Head title="Users" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                User List
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="mb-6 flex gap-4 ml-3">
                    <!-- Input Search -->
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Cari nama atau email..."
                        class="p-2 border rounded-md w-1/2"
                        @input="applyFilter"
                    />

                    <!-- Filter Status -->
                    <select
                        v-model="filter"
                        @change="applyFilter"
                        class="p-2 border rounded-md"
                    >
                        <option value="">Semua</option>
                        <option value="verified">Terverifikasi</option>
                        <option value="unverified">Belum Diverifikasi</option>
                    </select>
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
                                        Nama
                                    </th>
                                    <th
                                        class="border border-gray-300 px-4 py-2"
                                    >
                                        Email
                                    </th>
                                    <th
                                        class="border border-gray-300 px-4 py-2"
                                    >
                                        Status Verifikasi
                                    </th>
                                </tr>
                            </thead>
                            <template v-if="users.length > 0">
                                <tbody>
                                    <tr
                                        v-for="(users, index) in users"
                                        :key="users.id"
                                    >
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            {{ index + 1 }}
                                        </td>
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            {{ users.name }}
                                        </td>
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            {{ users.email }}
                                        </td>
                                        <td
                                            class="border border-gray-300 px-4 py-2"
                                        >
                                            <span
                                                :class="
                                                    users.email_verified_at
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                "
                                            >
                                                {{
                                                    users.email_verified_at
                                                        ? "Terverifikasi"
                                                        : "Belum Diverifikasi"
                                                }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                            <!-- Tampilkan pesan jika data kosong -->
                            <tbody v-else>
                                <tr>
                                    <td
                                        colspan="4"
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
