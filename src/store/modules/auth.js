import axios from "axios";

const state = () => ({
    loginToken: '',
    isLogin: false,
});

const getters = {
    getLoginToken(state) {
        return state.loginToken;
    },
    getLoginStatus: state => state.isLogin
};

const actions = {
    async loginApi({ commit }, payload) {
        try {
            console.log(import.meta.env.VITE_API_ADDRESS);
            const response = await axios.post(`${import.meta.env.VITE_API_ADDRESS}/api/v1/auth/login`,
                                            payload, 
                                            {
                                                headers: {
                                                            'Content-Type': 'application/json',
                                                        }
                                            });
            if(response && response.status == 200) {
                commit('setLoginToken', response.data.token);
                commit('setLoginStatus', true);
            }
        } catch (err) {
            throw err;
        }
    }
};

const mutations = {
    setLoginToken(state, token) {
        state.loginToken = token;
    },
    setLoginStatus(state, status) {
        state.isLogin = status;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};