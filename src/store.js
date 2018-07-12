import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    tasksStatus: [
      'Backlog',
      'ToDo',
      'Doing',
      'Done'
    ],
    tasks: [
      {
        id: 1,
        name: 'task1',
        description: 'test1 description',
        duration: 2,
        status: 'Backlog'
      },
      {
        id: 2,
        name: 'task2',
        description: 'test2 description',
        duration: 2,
        status: 'Backlog'
      },
      {
        id: 3,
        name: 'task3',
        description: 'test3 description',
        duration: 2,
        status: 'Backlog'
      },
    ],
    editedTaskIndex: -1,
    editedTask: {
      name: '',
      description: '',
      duration: 0,
      status: 'Backlog'
    },
    defaultTask: {
      name: '',
      description: '',
      duration: 0,
      status: 'Backlog'
    }
  },
  mutations: {
    SET_EDITED_TASK(state, obj) {
      state.editedTask = Object.assign({}, obj);
    },
    SET_EDITED_TASK_INDEX(state, index) {
      state.editedTaskIndex = index;
    },
    DELETE_TASK(state, index) {
      state.tasks.splice(index, 1);
    },
    EDIT_TASK(state) {
      Object.assign(
        state.tasks[state.editedTaskIndex],
        state.editedTask
      );
    },
    ADD_TASK(state) {
      state.tasks.push(state.editedTask);
    }
  },
  actions: {
    editTask({ commit, state }, task) {
      var index = state.tasks.indexOf(task);
      commit('SET_EDITED_TASK_INDEX', index);
      commit('SET_EDITED_TASK', task);
    },

    deleteTask({ commit }, index) {
      commit('DELETE_TASK', index);
    },

    resetEditedTask({ commit, state }) {
      setTimeout(() => {
        commit('SET_EDITED_TASK', state.defaultTask);
        commit('SET_EDITED_TASK_INDEX', -1);
      }, 300);
    },

    saveTask({ commit, state }) {
      if (state.editedTaskIndex > -1) {
        commit('EDIT_TASK');
      } else {
        commit('ADD_TASK');
      }
    }
  },
});
