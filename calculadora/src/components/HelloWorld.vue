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
              v-model="despesas"
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
      despesas: '',
      horaTecnica: '',
      horasAno: '',
      lucroAno: '',
      jobDias: '',
      jobHoras: '',
      jobTotal: '',
      min: '',
    }),
    methods: {
      calculo: function() {          
          if(this.semanaFerias){
              this.horasAno = this.horasDia*this.diasSemana*(48-this.semanaFerias)
          }else{
            this.horasAno = this.horasDia*this.diasSemana*(48)
          }
          if(this.despesas){              
          this.lucroAno = (parseFloat(this.salarioLiquido) + parseFloat(this.despesas))*12
          }else{
            this.lucroAno = parseFloat(this.salarioLiquido)*12
          }          
          let calcula = (this.lucroAno/100*110)/this.horasAno
          this.horaTecnica = calcula.toFixed(2)
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
