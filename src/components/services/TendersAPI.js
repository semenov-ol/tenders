export default class tendersAPI {
  constructor(){
     this.baseUrl = `https://public.mtender.gov.md/tenders`
  }
 
  getAll = async () => {
    try {
      const req = await fetch(this.baseUrl);
      const res = await req.json();
      return res;
    } catch {
      console.log('FETCH ERROR');
    }
  };

  getOne = async id => {
    try {
      const req = await fetch(`${this.baseUrl}/${id}`);
      const res = await req.json();
      return res;
    } catch {
      console.log('FETCH ERROR');
    }
  };
}