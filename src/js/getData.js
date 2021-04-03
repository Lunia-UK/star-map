export default class GetData {
  async getData(){
    try {
      let result = await fetch('./data/juridictions.json');
      let data = await result.json();
      let dataJuridictions = data.juridiction;
      dataJuridictions = dataJuridictions.map(item => {
        const {astreName, Xposition, Yposition, Zposition, size, texture, color} = item.astre;
          return {astreName, Xposition, Yposition, Zposition, size , texture, color}
      })
     return dataJuridictions;
    } catch (error) {
      console.log(error)
    }
  }
}