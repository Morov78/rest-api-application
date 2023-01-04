const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_CONNECTION
    
  } = process.env;
const makeUriDb = ()=> {
  if (DB_PORT) {return `${DB_CONNECTION}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`}
  return `${DB_CONNECTION}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`
  
}

  
  
  module.exports = {
    uriDb: makeUriDb()
  };

//  mongodb+srv://Morov:10101010@cluster0.lyyaxva.mongodb.net/db-contacts?retryWrites=true&w=majority
  