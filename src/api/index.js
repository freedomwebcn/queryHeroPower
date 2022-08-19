import ajax from './ajax'
import service from './service'


export const reqHeroData = () => service('/herolist.json')
export const reqHeroPower = ({
    heroName,
    type
}) => ajax(`/hero/select.php?hero=${heroName}&type=${type}`)