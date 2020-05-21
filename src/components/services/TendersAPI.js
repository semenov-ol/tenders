export default class TendersAPI {
  getAll = async () => {
    try {
      const uri = `https://public.mtender.gov.md/tenders`;
      const req = await fetch(uri);
      const res = await req.json();
      return res;
    } catch {
      console.log('FETCH ERROR');
    }
  };

  getOne = async id => {
    try {
      const uri = `https://public.mtender.gov.md/tenders/${id}`;
      const req = await fetch(uri);
      const res = await req.json();
      return res;
    } catch {
      console.log('FETCH ERROR');
    }
  };
}
