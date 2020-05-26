import baseUrl from '../../config';

export default class TendersAPI {
  getAll = async () => {
    try {
      const req = await fetch(baseUrl);
      const res = await req.json();
      return res;
    } catch {
      console.log('FETCH ERROR');
    }
  };

  getOne = async id => {
    try {
      const req = await fetch(`${baseUrl}/${id}`);
      const res = await req.json();
      return res;
    } catch {
      console.log('FETCH ERROR');
    }
  };
}
