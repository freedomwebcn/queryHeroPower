import { reactive } from "vue";

export const store = reactive({
  heroData: [],
  setHeroData(data) {
    this.heroData = data;
  },
});
