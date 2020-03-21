<template>
  <v-container style="background-color: transparent!important;"
        fluid
          >
          <v-row  align="center"
          justify="center" style="margin-bottom: -12px; margin-top: 100px">
        <v-col cols="12"
            sm="12"
            md="8" lg="5" >
            <div class="text-center"  style="margin-bottom: -12px; border-top-left-radius: 20px; border-top-right-radius: 20px; background-color: rgba(255, 255, 255, 0.7)">
              <br>
              <h1>Calculadora de Freelas</h1>
              Saiba o quanto cobrar por um freela.
              <br>
              <br>
            </div>
        </v-col>
          </v-row>
    <v-row  align="center"
          justify="center">
        <v-col cols="12"
            sm="12"
            md="8" lg="5">
          <v-tabs
            v-model="tab"
            dark
            background-color="light-blue darken-2"
            slider-color="green"
            :centered="false"
            :grow="true"
            :icons-and-text="false"
            mandatory="true"
            >
            <v-tab :key="1" >
                Pretensões
              </v-tab>
            
            <v-tab :key="2" >
                Despesas
            </v-tab>

            <v-tab :key="3"  :disabled='mHoraTecnica'>
                Hora técnica
            </v-tab>

            <v-tab :key="4"  :disabled='mProjeto'>
                Projeto
            </v-tab>

              <v-tab-item
                      :key="1"
                    >
                    <v-row align="center" 
                      justify="center" >
                      <v-col cols="10" class="text-center" > 
                       <br>
                        Informe suas pretensões
                        <br>
                        <br>
                        <v-text-field
                          label="Quanto quer de salário livre por mês?"
                          v-model="salarioLiquido"                          
                          @input="verifica"
                          outlined
                          dense
                          prefix="R$"
                          @change="calculo"
                          type="number"
                          autocomplete="off"
                          :error-messages="erros.salario"
                        />
                        <v-text-field
                          label="Vai trabalhar quantas horas por dia ?"
                          v-model="horasDia"
                          @input="verifica"
                          outlined
                          dense
                          type="number"
                          :min="0"
                          @change="calculo"
                          autocomplete="off"
                          :error-messages="erros.horas"
                        />
                        <v-text-field
                          label="Quer trabalhar quantos dias por semana ?"
                          v-model="diasSemana"
                          @input="verifica"
                          outlined
                          dense
                          type="number"
                          :min="0"
                          @change="calculo"
                          autocomplete="off"
                          :error-messages="erros.dias"
                        />      
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
                          autocomplete="off"
                        />
                        
                      </v-col>

                    </v-row>
                    <v-row>
                      <v-col align="right">
                      <v-btn @click="controle('+1')" :disabled="mDespesas" small color="light-blue darken-2" style="margin-right: 10px">Proximo</v-btn>
                      </v-col>
                    </v-row>
              </v-tab-item>

              <v-tab-item
                      :key="2"
                    >

                    
                  <v-row align="center"
                      justify="center">
                      <v-col cols="10" align="right">
                        Total das Despesas <span style="color: red; font-weight: bold;">R$ {{ this.totalDespesas}}</span>
                        <br>
                        <br>
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
                          <v-col align="center">
                          <v-btn @click="incluir(form)" small color="primary">Incluir </v-btn>
                          </v-col>
                          </v-form>
                            <v-simple-table fixed-header dense height="150px" style="margin-top: 15px; margin-bottom: 0px">
                              <template>
                                <thead>
                                  <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-left">Calories</th>
                                    <th class="text-right"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(despesa, index) in despesas" :key="index">
                                    <td>{{ despesa.nome }}</td>
                                    <td>R$ {{ despesa.valor }}</td>
                                    <td  class="text-right"><v-btn @click="remove(index)" small color="primary">X</v-btn></td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-col align="left">
                      <v-btn  @click="controle('-1')" small color="light-blue darken-2" style="margin-left: 10px">Anterior</v-btn>
                      </v-col>
                      <v-col align="right">
                      <v-btn  @click="controle('+1')" small color="light-blue darken-2" style="margin-right: 10px">Proximo</v-btn>
                      </v-col>
                    </v-row>
              </v-tab-item>

              <v-tab-item
                      :key="3"
                    >
                <v-row align="center"
                      justify="center">
                      <v-col cols="10" align="center">
                       <br>
                       <br>
                      <h2 style="color: darkgreen">Sua hora técnica é: <span style="font-weight: bold;">R$ {{ this.horaTecnica }}</span>
                      </h2>
                      
                      <br><br>
                    </v-col>
                  </v-row>
                    <v-row>
                      <v-col align="left">
                      <v-btn  @click="controle('-1')" small color="light-blue darken-2" style="margin-left: 10px">Anterior</v-btn>
                      </v-col>
                      <v-col align="right">
                      <v-btn  @click="controle('+1')" small color="light-blue darken-2" style="margin-right: 10px">Proximo</v-btn>
                      </v-col>
                    </v-row>
              </v-tab-item>
              
              <v-tab-item
                      :key="4"
                      align="center"
                    >
                  Numa proxima atualização

              
              </v-tab-item>

          </v-tabs>
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
    name: 'Calculadora',
    data: () => ({
      mDespesas: false,
      mHoraTecnica: true,
      mProjeto: true,
      salarioLiquido: '',
      valorrreal: ',##',
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
      tab: null,
      erros: [],
      despesas: [
        {nome: 'Aluguel', valor: '800'},
        {nome: 'Internet', valor: '120'},
        {nome: 'Luz', valor: '200'},
      ]
    }),
    created () {
      this.contador()
    },
    methods: {
      calculo () {          
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
      verifica () {

        if(this.salarioLiquido){
          if(this.salarioLiquido < 1 ){
              this.erros.salario = "valor não pode ser menor que 1"
              return false
          } else {
          delete this.erros.salario
          }
        }else{
          this.erros.salario = "precisa preencher"
        }
        if(this.horasDia){
          if(this.horasDia < 1){
              this.erros.horas = "valor não pode ser menor que 1"
              return false
          } else {
           delete this.erros.horas
          }
        }else{
          this.erros.horas = "precisa preencher"
          return
        }
        if(this.diasSemana){
          if(this.diasSemana < 1){
              this.erros.dias = "valor não pode ser menor que 1"
              return false
          } else {
           delete this.erros.dias
          }
        }else{
          this.erros.dias = "precisa preencher"
        }
      },
      controle (valor) {
        if(this.verifica() == true){
          this.tab = parseInt(this.tab)+parseInt(valor)
          console.log(valor)
          console.log(this.tab)
        }
      },
      incluir (despesa) {
        console.log(despesa.dNome + ' ' + despesa.dValor)
        this.despesas.push({nome: despesa.dNome, valor: despesa.dValor})
        this.form.dNome = ''
        this.form.dValor = ''
        this.contador()
        this.calculo()
      },
      remove (despesa) {
        this.despesas.splice(despesa, 1)
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