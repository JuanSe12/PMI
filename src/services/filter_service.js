export default function filterIt(array, searchKey) {
    return array.filter(obj=> {
      
      return Object.keys(obj).some((key)=> {
          return obj[key]
          .toString()
          .toUpperCase()
          .includes( searchKey.toUpperCase() )
      })
    });
  }