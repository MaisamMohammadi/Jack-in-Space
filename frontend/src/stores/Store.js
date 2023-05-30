import { defineStore } from 'pinia';

export const useStore = defineStore('DefaultId', {
  state: () => {
    return {
      aboutContent: 'Something about the app. (From Pinia-Store)',
      homeContent:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, sapiente? (From Pinia-Store)',
    };
  },
  actions: {},
  getters: {},
});

export const gameStore = defineStore('gameStore', () => {
  const showMenu = false;

  const score = 0;

  return { showMenu, score };
});
