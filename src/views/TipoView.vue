<template>
    <div>
        <h5>Tipos</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar Tipo" @searchtext="searchFx($event)"></search>
                
                <table class="highlight responsive-table card">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items">
                            <td>{{ item.name }}</td>
                            
                            <td>
                                <router-link :to="'/tipos/'+item.id">
                                    <i class="material-icons">create</i>
                                </router-link>
                                    <i class="material-icons" style="color: red" @click="eliminarItem(item.id)">delete_forever</i>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </template>
            <template v-slot:nuevo>
                <div class="row card p-2" style="max-width: 650px;">
                    <h6>Formulario nuevo Tipo</h6>
                    <form class="col s12" @submit.prevent="saveProduct()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="name" type="text" class="validate" v-model="payload.name">
                                <label for="name"> Nombre</label>
                            </div>
                        </div>
                      
                        
                        <div class="row">
                            <div class="input-field col s12">
                                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i class="material-icons right">enviar</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </template>
        </tabs>
    </div>
</template>
  
<script>

import Tabs from '@/components/Tabs.vue';
import Search from '@/components/Search.vue';
import FilterItem from '@/components/FilterItem.vue';
import FilterGroup from '@/components/FilterGroup.vue';
export default {
    name: 'types',
    data() {
        const api = "http://localhost:3000";
        return {
            api,
            items: [],
            
            toSearch: '',
            
            payload: {
                name: ''
            }
        }
    },
    methods: {

        onFilterFx(field, event) {
            if (event === '') {
                this.toFilter = '';
            } else {
                this.toFilter = '&' + field + '=' + event;
            }
            this.getItems();
        },
        getItems() {
            this.axios({
                method: 'get',
                url: this.api + '/types?_expand=name' + this.toSearch 
            })
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
        },
        
        getTypes() {
            this.axios({
                method: 'get',
                url: this.api + '/types'
            })
                .then((response) => {
                    this.categories = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        saveProduct() {
            this.axios({
                method: 'post',
                url: this.api + '/types',
                data: this.payload
            })
                .then((response) => {
                    this.payload = {
                        name: ''
                    };
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    this.getItems();

                    console.log(response);
                });
        },
        searchFx(event) {
            if (event === "") {
                this.toSearch = '';
            } else {
                this.toSearch = '&q=' + event;
            }
            this.getItems();
            console.log('search', event);
        },
        eliminarItem(id){
            if(confirm("Esta seguro que desea eliminar.")){
            this.axios({
                method: 'delete',
                url: this.api + '/types/' + id
            })
                .then((response) => {
                    this.getItems();
                });
            }
        }
    },
    mounted() {
        this.getItems();
        
        this.getTypes();
    },
    components: {
        Tabs, Search, FilterItem, FilterGroup
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style>

</style>