import ajax from './ajax'
import service from './service'


export const reqHeroData = () => service('/herolist.json')
// qq,wx,ios_qq,ios_wx
export const reqHeroPower = ({
    heroName,
    
    type
    }) => ajax(`select?name=${heroName}&type=${type}`)