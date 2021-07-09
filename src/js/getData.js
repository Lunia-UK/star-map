export default class GetData {
  async getData(){
    try {
      let result = await fetch('./data/stanton.json');
      let data = await result.json();
     return data;
    } catch (error) {
      console.log(error)
    }
  }
}