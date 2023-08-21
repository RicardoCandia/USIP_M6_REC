<template>
    <div>
        <h5>Empleados</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar empleado" @searchtext="searchFx($event)"></search>
                <filter-group>
                    <filter-item :items="types" label="Tipo de Vehículo"
                        @onfilter="onFilterFx('typesId', $event)"></filter-item>
                </filter-group>
                <table class="highlight responsive-table card">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Area</th>
                            <th>Tipo</th>
                            <th>Color</th>
                            <th>Placa</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items">
                            <td>{{ item.name }}</td>
                            <td>{{ item.areasId }}</td>
                            <td>{{ item.typesId }}</td>
                            <td>{{ item.color }}</td>
                            <td>{{ item.placa }}</td>
                            <td>
                                <router-link :to="'/employees/'+item.id">
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
                    <h6>Formulario nuevo empleado</h6>
                    <form class="col s12" @submit.prevent="saveProduct()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="name" type="text" class="validate" v-model="payload.name">
                                <label for="name"> Nombre</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <select v-model="payload.areasId" >
                                    <option value="" disabled selected>Elija una Area</option>
                                    <option v-for="(value, key) in areas" :key="key" :value="value.id">{{ value.name }}
                                    </option>
                                </select>
                                <label>Categoria</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <select v-model="payload.typesId" >
                                    <option value="" disabled selected>Elija un Tipo</option>
                                    <option v-for="(value, key) in types" :key="key" :value="value.id">{{ value.name }}
                                    </option>
                                </select>
                                <label>Categoria</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="phone" type="text" class="validate" v-model="payload.color">
                                <label for="phone"> Color</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="placa" type="text" class="validate" v-model="payload.placa">
                                <label for="placa"> Placa</label>
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
    name: 'employees',
    data() {
        const api = "http://localhost:3000";
        return {
            api,
            items: [],
            
            types: [],
            areas: [],
            toSearch: '',
            toFilter: '',
            payload: {
                name: '',
                areasId: null,
                typesId: null,
                color: null,
                placa: null
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
                url: this.api + '/employees?_expand=name' + this.toSearch + this.toFilter
            })
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
        },
      
        getAreas() {
            this.axios({
                method: 'get',
                url: this.api + '/areas'
            })
                .then((response) => {
                    this.areas = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        getTypes() {
            this.axios({
                method: 'get',
                url: this.api + '/types'
            })
                .then((response) => {
                    this.types = response.data;
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
                url: this.api + '/employees',
                data: this.payload
            })
                .then((response) => {
                    this.payload = {
                        name: '',
                        areasId: null,
                typesId: null,
                        color: null,
                        placa: null
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
                url: this.api + '/employees/' + id
            })
                .then((response) => {
                    this.getItems();
                });
            }
        }
    },
    mounted() {
        this.getItems();
        
        this.getAreas();
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