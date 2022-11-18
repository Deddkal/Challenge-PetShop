const { createApp } = Vue

const app = createApp ({
    data(){
        return{
            productos: [],
            carrito: [],
        }
    },
    created(){
        fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(response => response.json())
        .then( json => {
            this.carrito = JSON.parse(localStorage.getItem('carrito'))
            this.controlCarrito()
            this.productos=json.response
            this.productos.map(e => this.nuevaPropiedad(e))
            console.log(this.productos)
            
        })
        .catch(error => console.log(error))

    },methods:{
        nuevaPropiedad(objeto){{
            objeto.cantidad= 0; 
        }
        },
        enviarCarrito(e){
            let aux = {}
            aux = this.productos.find( element => element._id == e.target.id)
            console.log(aux._id)
            if ((this.carrito.length == 0) || !(this.carrito.find( e => e._id == aux._id ))) {
                this.carrito.push(aux)
                localStorage.setItem('carrito', JSON.stringify(this.carrito))
            }
            
            console.log(this.carrito)
        },
        controlCarrito(e){
            if(this.carrito==null){
            localStorage.setItem('carrito', JSON.stringify([]))
            }
        },
        sumarProducto(e){
            let aux = e.target.id.slice(5)
            let productoSeleccionado = this.productos.find(elemento => elemento._id == aux)
            console.log(productoSeleccionado)
        },
        restarProducto(){

        }
    },
    computed:{

    }
})

app.mount('#app')