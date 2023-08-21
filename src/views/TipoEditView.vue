<template>
    <div>
        <h5>Editar Tipo </h5>
        <div class="row card p-2" style="max-width: 650px;">
            <h6>Formulario editar Tipo</h6>
            <form class="col s12" @submit.prevent="saveProduct()">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="name" type="text" class="validate" v-model="payload.name">
                        <label for="name"> Nombre</label>
                    </div>
                </div>
                
                <div class="row">
                    <div class="input-field col s12">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Enviar
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'areas',
    data() {
        const api = "http://localhost:3000/";
        return {
            api,
            
            payload: {
                name:""
            }
        }
    },
    methods: {

        getItem() {
            this.axios({
                method: 'get',
                url: this.api + '/areas/'+this.$route.params.id
            })
                .then((response) => {
                    this.payload = response.data;
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    console.log(response);
                });
        },
       
        saveProduct() {
            this.axios({
                method: 'patch',
                url: this.api + '/areas/'+this.$route.params.id,
                data: this.payload
            })
                .then((response) => {
                   this.$router.push('/areas');

                    console.log(response);
                });
        }
        
    },
    mounted() {
        this.getItem();
        
        
    },
    components: {
        
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style scoped lang="scss">
i {
    cursor: pointer;
    margin-right: 10px;

}
</style>