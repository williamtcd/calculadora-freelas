<template>
  <v-container class="fill-height"
        fluid
          >
        
    <v-row  align="center"
          justify="center">
      
        <v-col cols="12"
            sm="12"
            md="8" lg="5">
             <div class="text-center"  style="margin-bottom: -12px; border-top-left-radius: 20px; border-top-right-radius: 20px; background-color: rgba(255, 255, 255, 0.7)">
              <br>
              <h1>Calculadora de Freelas</h1>
              Saiba o quanto cobrar por um freela.
              <br>
              <br>
            </div>
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
            
            <v-tab :key="2" :disabled='menublock' @click="verifica()">
                Despesas
            </v-tab>

            <v-tab :key="3"  :disabled='menublock' @click="verifica()">
                Hora técnica
            </v-tab>

            <v-tab :key="4" :disabled='menublock' @click="verifica()">
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
                         <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                          >
                        <v-text-field
                          label="Quanto quer de salário livre por mês?"
                          v-model="salarioLiquido"
                          @input="calculo"
                          outlined
                          :rules='salarioRegras'
                          dense
                          prefix="R$"
                          type="number"
                          autocomplete="off"
                          :error-messages="erros.salario"
                        />
                        <v-text-field
                          label="Vai trabalhar quantas horas por dia ?"
                          v-model="horasDia"
                          @input="calculo"
                          outlined
                          :rules='horasRegras'
                          dense
                          v-mask="maskhoras"
                          autocomplete="off"
                          :error-messages="erros.horas"
                        />
                        <v-text-field
                          label="Quer trabalhar quantos dias por semana ?"
                          v-model="diasSemana"
                          @input="calculo"
                          outlined
                          :rules='diasRegras'
                          v-mask="maskSemana"
                          dense
                          :min="0"
                          autocomplete="off"
                          :error-messages="erros.dias"
                        />      
                        <v-text-field
                          label="Quantas semanas de férias por ano ?"
                          v-model="semanaFerias"                          
                          @input="calculo"
                          :rules='feriasRegras'
                          v-mask="maskFerias"
                          outlined
                          dense
                          :max="47"
                          :min="0"
                          autocomplete="off"
                        />
                         </v-form>
                      </v-col>

                    </v-row>
                    <v-row>
                      <v-col align="right">
                      <v-btn @click="controle('+1')"  small color="light-blue darken-2" style="margin-right: 10px">Proximo</v-btn>
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
                            label="Despesa"
                            v-model="form.dNome"
                            :error-messages="erros.despesaNome"
                            outlined
                            dense
                          ></v-text-field>
                          <v-text-field
                            label="Valor"
                            v-model="form.dValor"
                            :error-messages="erros.despesaValor"
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
                 <v-row align="center"
                      justify="center">
                                          
                      <v-col cols="10" align="center">
                       <br>
                      <h2 style="color: darkgreen">Valor desse Projeto é 
                        <span style="font-weight: bold;">R$ {{ jobTotal }}</span></h2>  
                        <br>
                        <v-text-field
                          label="Sua hora técnica calculada é:"
                          v-model="horaTecnica"
                          :disabled="true"
                          outlined
                          dense
                        />
                        <v-text-field
                          label="Quantas horas por dia no projeto ?"
                          v-model="jobHoras"
                          @input="calcjobs()"
                          :rules='horasRegras'
                          outlined
                          dense
                          v-mask="maskhoras"
                          :autocomplete="off"
                          :error-messages="erros.horas"
                        />
                        <v-text-field
                          label="Quantos dias o projeto vai durar ?"
                          v-model="jobDias"
                          @input="calcjobs()"                          
                          :rules='diasJobRegras'                          
                          v-mask="maskjobsDias"
                          outlined
                          dense
                          :autocomplete="off"
                          :error-messages="erros.horas"
                        />
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
      valid: true,
      menublock: true,
      salarioLiquido: '',
      salarioRegras: [
        value => !!value || 'Informe o salario',
        value => (value && value > 0) || '0, sério ? não quer comprar nada depois de pagar as contas ?',
      ],
      diasRegras: [
        value => !!value || 'Não pode deixar em branco',
        value => (value && value > 0) || 'Precisa ser maior que 0, vamos trabalhar',
        value => (value && value <= 7) || 'Uma semana só tem 7 dias',
      ],
      horasRegras: [
        value => !!value || 'Não pode deixar em branco',
        value => (value && value > 0) || 'Precisa ser maior que 0, vamos trabalhar',
        value => (value && value < 19) || 'Cuide da sua saude, max 18',
        
      ],
      feriasRegras: [
        value => !!value || 'Você merece folga',
        value => (value && value > 0) || 'Você merece ao menos 1 semana',
        value => (value && value < 48) || 'Não vamos exagerar né, 47 é o máximo',
      ],
      diasJobRegras: [
        value => !!value || 'Não pode deixar em branco',
        value => (value && value > 0) || 'Precisa ser maior que 0, vamos trabalhar',
      ],
      valorrreal: ',##',
      horasDia: '',
      diasSemana: '',
      maskSemana: '#',
      maskhoras: '##',
      maskFerias: '##',
      maskjobsDias: '###',
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
      validate () {
        this.$refs.form.validate()
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
      async verifica () {   
        await this.validate()
        
          this.menublock = !this.valid
          if(this.valid === false){
            this.tab = 0
          }
        return this.valid        
      },
      async controle (valor) {
        if( await this.verifica() === true){
          this.tab = parseInt(this.tab)+parseInt(valor)
        }
      },
      incluir (despesa) {
        if(!despesa.dNome){
           this.erros.despesaNome = 'De um nome pra sua despesa'
           this.form.dNome = onfocus
          return false
        }
        delete this.erros.despesaNome
        if(!despesa.dValor){
          this.erros.despesaValor = 'Qual valor da despesa'
           this.form.dValor = onfocus
          return false
        }
        if(parseFloat(despesa.dValor) <= 0){
           this.erros.despesaValor = ' sério isso ? temos um brincalhão aqui! '
           this.form.dValor = onfocus
          return false
        }        
        delete this.erros.despesaValor
        
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
      calcjobs () {
          if(!this.jobHoras){
              return false
          }
          
          if(!this.jobDias){
             return false
          }
          let calcula = this.horaTecnica*this.jobHoras*this.jobDias
          this.jobTotal = calcula.toFixed(2)
      }       
    }
}

</script>