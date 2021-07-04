export default class GetData {
  async getData(){
    try {
      let result = await fetch('./data/juridictions.json');
      let data = await result.json();
      let dataJuridictions = data.juridiction;
      dataJuridictions = dataJuridictions.map(item => {
        return item
      })
     return dataJuridictions;
    } catch (error) {
      console.log(error)
    }
  }
}