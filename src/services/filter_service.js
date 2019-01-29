export default function filterIt(array, searchKey) {
    return array.filter(function(obj) {
      return Object.keys(obj).some(function(key) {
          return obj[key]
          .toString()
          .toUpperCase()
          .includes( searchKey.toUpperCase() )
      })
    });
  }