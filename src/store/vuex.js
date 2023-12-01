import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      countProductsCart: '0'
    }
  },

  mutations: {
    getCarts(state) {
      const carrito = JSON.parse(localStorage.getItem('carrito'))
      state.countProductsCart = carrito ? carrito.length.toString() : '0';
    }
  },

  actions: {
    init(context) {
      context.commit('getCarts')
    }
  }
})

export default store