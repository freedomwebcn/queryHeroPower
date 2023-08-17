import ajax from "./ajax";

export const reqHeroData = () => ajax(`getHeroList.php`);


export const reqHeroPower = ({ heroName, type }) => ajax(`getHeroInfo.php?hero=${heroName}&type=${type}`);

export const reqHeroPowerAqq = ({ heroName }) => ajax(`getHeroInfo.php?hero=${heroName}&type=aqq`);
export const reqHeroPowerAwx = ({ heroName }) => ajax(`getHeroInfo.php?hero=${heroName}&type=awx`);
export const reqHeroPowerIqq = ({ heroName }) => ajax(`getHeroInfo.php?hero=${heroName}&type=iqq`);
export const reqHeroPowerIwx = ({ heroName }) => ajax(`getHeroInfo.php?hero=${heroName}&type=iwx`);
