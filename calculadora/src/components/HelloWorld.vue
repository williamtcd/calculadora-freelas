<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
         <v-text-field
              label="Quanto quer ganhar de salário Liquido ?"
              v-model="salarioLiquido"
              @input="calculo"
              outlined
              dense
              prefix="R$"
              :min="0"
              type="number"
            ></v-text-field>
            <v-text-field
              label="Quer trabalhar quantas horas por dia ?"
              v-model="horasDia"
              @input="calculo"
              outlined
              dense
              type="number"
              :min="0"
            ></v-text-field>
            <v-text-field
              label="Quer trabalhar quantos dias por semana ?"
              v-model="diasSemana"
              @input="calculo"
              outlined
              dense
              type="number"
              :min="0"
            ></v-text-field>            
            <v-text-field
              label="Quantas semanas de férias por ano ?"
              v-model="semanaFerias"
              @change="verificaFerias"
              @input="calculo"
              outlined
              dense
              type="number"
              :max="47"
              :min="0"
            ></v-text-field>
            <v-text-field
              label="Total de despesas por mês ?"
              v-model="totalDespesas"
              @input="calculo"
              outlined
              dense
              prefix="R$"              
              type="number"
              :min="0"
            ></v-text-field>
            <v-text-field
              label="sua hora tecnica é:"
              v-model="horaTecnica"
              outlined
              dense              
              type="number"
              readonly
            ></v-text-field>
            <ul>
            <li v-for="despesa in despesas" :key="despesa.id">
            {{ despesa.nome }}
            {{ despesa.valor }}</li>
          </ul>
          <v-form>
          <v-text-field
              label="nome"
              v-model="form.dNome"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="valor"
              v-model="form.dValor"
              outlined
              dense
              prefix="R$"
              type="number"
            ></v-text-field>
            <v-btn @click="incluir(form)" small color="primary">Salva</v-btn>
            </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mask } from 'vue-the-mask'
  export default {
    directives: {
      mask,
    },
    name: 'HelloWorld',
    data: () => ({
      salarioLiquido: '',
      horasDia: '',
      diasSemana: '',
      semanaFerias: '',
      totalDespesas: '',
      horaTecnica: '',
      horasAno: '',
      lucroAno: '',
      jobDias: '',
      jobHoras: '',
      jobTotal: '',
      min: '',
      form: {        
        dNome: '',
        dValor: ''
      },
      despesas: [
        { nome: 'Aluguel', valor: '800' },
        { nome: 'luz', valor: '15.5' },
      ]
    }),
    created () {
      this.contador()
    },
    methods: {
      calculo: function() {          
          if(this.semanaFerias){
              this.horasAno = this.horasDia*this.diasSemana*(48-this.semanaFerias)
          }else{
            this.horasAno = this.horasDia*this.diasSemana*(48)
          }
          if(this.totalDespesas){              
          this.lucroAno = (parseFloat(this.salarioLiquido) + parseFloat(this.totalDespesas))*12
          }else{
            this.lucroAno = parseFloat(this.salarioLiquido)*12
          }          
          let calcula = (this.lucroAno/100*110)/this.horasAno
          this.horaTecnica = calcula.toFixed(2)
      },
      contador () {
        this.totalDespesas = 0
        const desp = this.despesas
        desp.forEach((despesa) => {
          console.log(despesa.valor)          
          if(!this.totalDespesas){
            this.totalDespesas = parseFloat(despesa.valor)
          } else {
          this.totalDespesas = parseFloat(this.totalDespesas)+parseFloat(despesa.valor)
          }
          console.log(this.totalDespesas)
        })
      },
      incluir (desp) {
        console.log(desp.dNome + ' ' + desp.dValor)
        this.despesas.push({nome: desp.dNome, valor: desp.dValor})
        this.form.dNome = ''
        this.form.dValor = ''
        this.contador()
        this.calculo()
      },
      verificaFerias () {
        if(this.semanaFerias > 47){
          this.semanaFerias = 47
        }
        if(this.semanaFerias < 0 ){
          this.semanaFerias = 0
        }
        this.calculo()
      },
      calcjobs: function () {
          if(!this.jobHoras){
              this.jobHoras = 0
          }
          if(!this.jobDias){
              this.jobDias = 0
          }
          this.jobTotal = this.horaTecnica*this.jobHoras*this.jobDias
      }       
    }
}
</script>
