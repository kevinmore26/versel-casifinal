import React,{Component} from 'react';
import {Bar} from 'react-chartjs-2';
import "chart.piecelabel.js"

class AdopNoAdop extends Component{
    state={
        respuesta:[],
        nombre:[],
        cuenta:[],
        colores:[],
        data:[],
        opciones:{}
    }

async peticion(){
    var peticion=await fetch('http://127.0.0.1:8000/gestion/cliente_especial');
    var respuesta=await peticion.json();
    this.setState({respuesta:respuesta});
    var nombre=[],cuenta=[]
    this.state.respuesta.content.map((elemento)=>{
        nombre.push(elemento.nombre);
        cuenta.push(elemento.cuenta);   
        return elemento
    });
    this.setState({nombre:nombre,cuenta:cuenta});
// array prototypemap expects a return value from arrow function
    }
    generarCaracter(){
        var caracter=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
        var numero=(Math.random()*15).toFixed(0);
        return caracter[numero];
    }
    colorHEX(){
        var color="";
        for(var i=0;i<6;i++){
            color=color+this.generarCaracter();
        }
        return "#" + color;
    }
    generarColores(){
        var colores=[];
        for(var i=0;i<this.state.respuesta.length;i++){
            colores.push(this.colorHEX());
        }
        this.setState({colores:colores})
    }
    configurarGrafica(){
        const data={
            labels:this.state.nombre,
            
            datasets:[{
                label:'Clientes',
                data:this.state.cuenta,
                // backgroundColor:this.state.colores,
                // background:this.state.colores,
                // color:this.state.colores

                backgroundColor:'rgb(25, 135, 84)'
            }]
        };
        const opciones={
            responsive:false,
            maintainAspectRatio:false,
            piecelabel:{
                render:function(args){
                    return args.label +": "+ args.value+"%";
                },
                fontSize:2,
                // fontColor:'#fff',
                fontFamily:'Arial'
            }
        }
        this.setState({data:data,opciones:opciones});
    }

    async componentDidMount(){
        await this.peticion();
        await this.generarColores();
        this.configurarGrafica();
    }

    render(){

        return(
            <div style={{maxWidth:'45vw',marginBottom:'200px',position:'relative',bottom:'80px'}}>
                <h3 style={{textAlign:'center',fontFamily:'cursive'}}>Top Clientes Octubre</h3>
                <Bar data={this.state.data} options={this.state.opciones} style={{height:'400px'}}/>
            </div>
        );
    }
}

export default AdopNoAdop;


