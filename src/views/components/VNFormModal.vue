<script setup>
    import { VueFinalModal } from 'vue-final-modal';
    import MdiClose from './MdiClose.vue';
</script>

<template>
    <vue-final-modal v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center m-5"
    content-class="relative flex flex-col 2xl:w-1/2 max-h-full mx-4 p-4 border-transparent rounded-lg dark:border-gray-800 rounded bg-white dark:bg-gray-900">
        <span class="mr-8 text-2xl font-bold">Add Visual Novel</span>
        <div class="overflow-y-auto my-5">
            <v-form ref="form" v-model="valid" class="px-2" lazy-validation>
                <!-- General Information -->
                <h2 class="text-lg font-semibold">General Information</h2>
                <v-text-field v-model="code" label="VNDB Code" hint="Example: v1234" :rules="codeRule" required></v-text-field>
                <v-text-field v-model="title" label="Title" disabled></v-text-field>
                <!-- VN Link -->
                <v-divider class="py-3"></v-divider>
                <h2 class="text-lg font-semibold">VN Links</h2>
                <v-form v-model="isVNUrlValid">
                    <v-select clearable v-model="vn.language" label="Language" :items=langageLists></v-select>
                    <v-select clearable v-model="vn.type" label="Type" :items=typeLists ></v-select>
                    <v-select clearable v-model="vn.platform" label="Platform" :items=platformLists required></v-select>
                    <v-text-field v-model="vn.link" label="Link" :rules="urlRule" required></v-text-field>
                    <button @click="addToList" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
                </v-form>
                <v-table theme="light" class="mt-2">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Language
                            </th>
                            <th class="text-left">
                                Type
                            </th>
                            <th class="text-left">
                                Platform
                            </th>
                            <th class="text-left">
                                Link
                            </th>
                            <th class="text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="vnLink in vnLinks" >
                            <td>{{ vnLink.language }}</td>
                            <td>{{ vnLink.type }}</td>
                            <td>{{ vnLink.platform }}</td>
                            <td><p class="lg:max-w-[2rem] xl:max-w-[10rem] 2xl:max-w-md truncate ...">{{ vnLink.link }}</p></td>
                            <td>
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="edit(item.code)">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                </button>
                                <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"  @click="destroy(item.code)">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </td>
                        </tr>                        
                    </tbody>
                </v-table>
            </v-form>
        </div>
        <div class="flex-shrink-0 flex justify-center items-center pt-4 space-x-4">
            <button @click="$emit('confirm', close)" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
            <button @click="close" type="button" class="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
        </div>
    </vue-final-modal>
</template>

<script>
    export default {
        data() {
            return {
                valid: true,
                isVNUrlValid: false,
                platformLists: ['Drive', 'Terabox', 'OneDrive', 'Mega'],
                typeLists: ['Default', 'Patch', 'Fandisk'],
                langageLists: ['JP', 'EN', 'ID'],
                codeRule: [
                    v => !!v || 'VN Code is request',
                    v => /v\d{1,7}/gm.test(v) || 'Invalid code format, Please using VNDB code format.'
                ],
                urlRule: [
                    v => !!v || 'Link is request',
                    v => /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(v) || 'Invalid URL Link.'
                ],
                
                // Temporary Data
                code: '',
                title: 'Dummy title',
                vnLinks: [],
                vn: {
                    language: null,
                    type: null,
                    platform: null,
                    link: ''
                },                
            }
        },
        methods: {
            addToList() {
                this.vnLinks.push({
                    id: this.vnLinks.length + 1,
                    language: this.vn.language,
                    type: this.vn.type,
                    platform: this.vn.platform,
                    link: this.vn.link
                });
                this.clearVNLinkForm();
            },
            clearVNLinkForm() {
                this.vn.language = null
                this.vn.type = null
                this.vn.platform = null
                this.vn.link = null;
            }
        }
    }
</script>