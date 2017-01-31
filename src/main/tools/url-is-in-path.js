import { map } from 'lodash'

export default function urlIsInPath(url, path){
  return url ? (path.includes(url) ? 'is--active' : '') : false;
}