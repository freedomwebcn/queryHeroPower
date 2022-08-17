import ajax from './ajax'

export const reqHeroData = () => ajax('hero/getHeroList.php')
export const reqHeroPower = ({
    heroName,
    type
}) => ajax(`/hero/select.php?hero=${heroName}&type=${type}`)