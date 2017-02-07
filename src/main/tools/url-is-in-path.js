import { includes } from 'lodash';

export default function urlIsInPath(url, path){
  return url ? (includes(path, url) ? 'is--active' : '') : false;
}
