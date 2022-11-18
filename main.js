const { createApp } = Vue

const app = createApp({
    data () {
        return{
            productos:[],
            farmacia: [],
            juguetes: [],
            productoFarmacia: [],
            productoJuguetes: [],
            carrito: [],

        }
    },
    created(){
        fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then( response => response.json())
        .then(data =>{
            console.log(data)
            this.productos = data.response
            this.crearProductoCompra()
            /* this.farmacia = this.productos.filter( e => e.tipo == 'Medicamento')
            this.juguetes = this.productos.filter( e => e.tipo == 'Juguete') */
            console.log(this.productos)
            console.log(this.productoFarmacia)
            console.log(this.productoJuguetes)
        })
        .catch(negative => console.log(negative))
    },
    methods:{
        sumarProducto(e){

            let aux = e.target.id.slice(5);
            this.productoFarmacia.filter(e => aux == e._id).map(e => {if(e.cantidad<e.stock){e.cantidad++}})
            /* if(this.carrito.length == 0 || !this.carrito.find(e => aux == e._id)){
            this.carrito.push(this.productoFarmacia.find(e => aux == e._id))
            } */
            
            console.log(this.carrito)
        },
        restarProducto(e){
            let aux = e.target.id.slice(6);
            
            this.productoFarmacia.filter(e => aux == e._id).map(e => {if(e.cantidad<=e.stock && e.cantidad>0){e.cantidad--}})
            if(this.carrito.length == 0 || this.carrito.find(e => e.cantidad ==0) && this.carrito.find(e => aux == e._id)){
            this.carrito = this.carrito.filter(e => !(e._id == aux))
            //    this.carrito.push(this.productoFarmacia.find(e => aux == e._id))
            } 
            console.log(this.carrito)
        },
        sumarProductoJuguete(e){
            console.log(e.target.id.slice(5))
            let aux = e.target.id.slice(5);
            this.productoJuguetes.filter(e => aux == e._id).map(e => {if(e.cantidad<e.stock){e.cantidad++}})
            if(this.carrito.length == 0 || !this.carrito.find(e => aux == e._id)){
            this.carrito.push(this.productoJuguetes.find(e => aux == e._id))
            }
            
            
        },
        restarProductoJuguete(e){
            let aux = e.target.id.slice(6);
            
            this.productoJuguetes.filter(e => aux == e._id).map(e => {if(e.cantidad<=e.stock && e.cantidad>0){e.cantidad--}})
            if(this.carrito.length == 0 || this.carrito.find(e => e.cantidad ==0) && this.carrito.find(e => aux == e._id)){
            this.carrito = this.carrito.filter(e => !(e._id == aux))
            } 
            
        },
        agregarProductoCarro(e){
            console.log([e.target.id.slice(7)])
            let aux = e.target.id.slice(7);
            /* this.productoJuguetes.filter(e => aux == e._id).map(e => {if(e.cantidad<e.stock){e.cantidad++}}) */
            if(this.carrito.length == 0 /* || !this.carrito.find(e => aux == e._id) */){
            this.carrito.push(this.productoFarmacia.find(e => aux == e._id))
            }
            
            
        },
        crearProductoCompra(){
            this.productos.forEach( e =>{
                if(e.tipo == 'Medicamento'){
                    this.productoFarmacia.push({
                        nombre: e.nombre,
                        descripcion: e.descripcion,
                        imagen: e.imagen,
                        precio: e.precio,
                        stock: e.stock,
                        tipo: e.tipo,
                        __v: e.__v,
                        _id: e._id,
                        cantidad: 0
                    })
                }else{
                    this.productoJuguetes.push({
                        nombre: e.nombre,
                        descripcion: e.descripcion,
                        imagen: e.imagen,
                        precio: e.precio,
                        stock: e.stock,
                        tipo: e.tipo,
                        __v: e.__v,
                        _id: e._id,
                        cantidad: 0
                    })
                }
            })
        },

    }
})
app.mount('#app')