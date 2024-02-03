import ajax from "./ajax";

export const reqHeroData = () => ajax(`getHeroList.php`);
export const reqHeroPower = ({ heroName, type }) => ajax(`getHeroInfo.php?hero=${heroName}&type=${type}`);


