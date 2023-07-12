import { reactive } from "vue";

export const store = reactive({
  heroData: {
    code: '',
    data: [],
  },
  setHeroData(data) {
    this.heroData = {...data};
  },
});
