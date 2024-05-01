const fs = require('fs');

var loadDatabase = (db_connection, schema ={})=>{
    if(!fs.existsSync(db_connection)){
        fs.writeFileSync(db_connection,JSON.stringify(schema));
    }
    let model = require(db_connection);

    var db ={
        model: model,
        filename: db_connection,
        update: ()=>{
            fs.writeFileSync(db_connection,JSON.stringify(model));
        },
        addCollection : (collection) => {
            model['collection']=[];
        }

    }
    return db;
}

module.exports=loadDatabase;