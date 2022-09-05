import ajax from './ajax'
import service from './service'

export const reqHeroData = () => service('/herolist.json')
export const reqHeroPower = ({
    heroName,
    type
}) => ajax(`/hero/select.php?hero=${heroName}&type=${type}`)


export const reqHeroPowerAqq = ({
    heroName
}) => ajax(`/hero/select.php?hero=${heroName}&type=aqq`)
export const reqHeroPowerAwx = ({
    heroName,
}) => ajax(`/hero/select.php?hero=${heroName}&type=awx`)
export const reqHeroPowerIqq = ({
    heroName,
}) => ajax(`/hero/select.php?hero=${heroName}&type=iqq`)
export const reqHeroPowerIwx = ({
    heroName,
}) => ajax(`/hero/select.php?hero=${heroName}&type=iwx`)