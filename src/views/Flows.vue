<template>
  <div class="flowDiv">
    <header>
      <img src="../assets/reds.svg" alt="" />
    </header>
    <Flow v-for="flow in getflows" :key="flow.flowID" :flowItem="flow" />
    <div class="penImg">
      <img @click="goTo" src="../assets/pen.svg" alt="">
    </div>
  </div>
</template>

<script>
import Flow from '../components/Flow'

export default {
    name: "Flows",
    data() {
      return {
        flows: ''
      }
    }, 
    components: {
      Flow
    },
    computed: {
     getflows() {
        return this.$store.state.flows;
      }
    },
    beforeMount(){
      this.$store.dispatch('fetchFlows')
    },
    methods: {
      goTo() {
        this.$router.push('/newFlow')
      }
    }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.flowDiv {
  background-color: #082756;
}
.flow {
  border: 1px solid black;
  background-color: #fff;
  margin: 1rem;
}
</style>