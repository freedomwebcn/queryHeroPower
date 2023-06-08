import ajax from "./ajax";

export const reqHeroData = () => ajax(`/hero/getHeroList.php`);


export const reqHeroPower = ({ heroName, type }) => ajax(`/hero/select.php?hero=${heroName}&type=${type}`);

export const reqHeroPowerAqq = ({ heroName }) => ajax(`/hero/select.php?hero=${heroName}&type=aqq`);
export const reqHeroPowerAwx = ({ heroName }) => ajax(`/hero/select.php?hero=${heroName}&type=awx`);
export const reqHeroPowerIqq = ({ heroName }) => ajax(`/hero/select.php?hero=${heroName}&type=iqq`);
export const reqHeroPowerIwx = ({ heroName }) => ajax(`/hero/select.php?hero=${heroName}&type=iwx`);
