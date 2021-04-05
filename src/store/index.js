import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API: 'http://localhost:3000',
    flows: Array
  },
  mutations: {
    setFlows(state, flows) {
      state.flows = flows;
    }    
  },
  actions: {
    async fetchFlows(ctx) {
      try {
        const flows = await ax.get(`${ctx.state.API}/flows`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('shuiToken')}`,
          }
        })
        ctx.commit('setFlows', flows.data);
      } catch (err) {
        console.log(err)
      }
    },
    async createdflow(ctx, newFlow) {
      const createdflow = await ax.post(
        `${ctx.state.API}/flows`,
        {
          info: newFlow.info,
          hashtags: newFlow.hashtags,
        },
        {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        }
      );
      router.push('/flow')
      console.log("newflow", createdflow);
    },
    async signUp(ctx, data) {
      try {
        let res = await ax.post(`${ctx.state.API}/users`, {
          username: data.username,
          password: data.password,
        });
        console.log('new user', res);
        router.push('/login');
      } catch (err) {
        console.log(err);
      }
    },
    async login(ctx, data) {
      try {
        const token = await ax.post(`${ctx.state.API}/auth/login`,
          {
            username: data.username,
            password: data.password,
          },
        );
        sessionStorage.setItem("shuiToken", token.data.token);
        sessionStorage.setItem("shuiToken", token.data.userkey);
        router.push('/flow');
      } catch (error) {
        console.error(error);
      }
    },
},
  modules: {
}
  })
