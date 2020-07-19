// please run "$ npm i request-promise request" in project root dir.
const rq = require('request-promise');


async function execute () {

  let readAllData = await readAll();
  console.log(readAllData);

  let readIdData = await readID(1);
  console.log(readIdData);

  let data = {
    "id": 5,
    "item": "6 from node app"
  };
  let createData = await create(data);
  console.log(createData);

  let newData = {
    "item": "5 from node app"
  };
  let updateData = await update(4, newData);
  console.log(updateData);

  let deleteData = await deleteId(2);
  console.log(deleteData);

}
execute();



async function create (data){
  let createData;
  let url = "https://us-central1-<your-app-id>.cloudfunctions.net/app/api/create/";
  let options = {
    method: 'POST',
    uri: url,
    body: data,
    json: true,
    resolveWithFullResponse: true
  };
  //console.log(url);
  await rq(options).then((r) => {
    console.log('Updating data status is %d', r.statusCode);
    createData = r.statusCode;
  }).catch((e) => {
    console.error(e);
  });

  return createData;
}


async function update (id, data){
  let updateData;
  let url = "https://us-central1-<your-app-id>.cloudfunctions.net/app/api/update/" + id;
  let options = {
    method: 'PUT',
    uri: url,
    body: data,
    json: true,
    resolveWithFullResponse: true
  };
  //console.log(url);
  await rq(options).then((r) => {
    console.log('Creating data status is %d', r.statusCode);
    updateData = r.statusCode;
  }).catch((e) => {
    console.error(e);
  });

  return updateData;
}



async function readID (id){
  let accountData;
  let url = "https://us-central1-<your-app-id>.cloudfunctions.net/app/api/read/" + id;
  //console.log(url);
  await rq(url).then((r) => {
    //console.log(r);
    let rqObj = JSON.parse(r);
    if(rqObj){
      //console.log(rqObj);
      accountData = rqObj;
    }
  }).catch((e) => {
    console.error(e);
  });

  return accountData;
}



async function readAll (){
  let accountData;
  let url = "https://us-central1-<your-app-id>.cloudfunctions.net/app/api/read";
  //console.log(url);
  await rq(url).then((r) => {
    //console.log(r);
    let rqObj = JSON.parse(r);
    if(rqObj){
      //console.log(rqObj);
      accountData = rqObj;
    }
  }).catch((e) => {
    console.error(e);
  });

  return accountData;
};



async function deleteId (id) {
  let deleteData;
  let url = "https://us-central1-<your-app-id>.cloudfunctions.net/app/api/delete/" + id;
  let options = {
    method: 'DELETE',
    uri: url,
    json: true,
    resolveWithFullResponse: true
  };
  //console.log(url);
  await rq(options).then((r) => {
    console.log('Deleting data status is %d', r.statusCode);
    deleteData = r.statusCode;
  }).catch((e) => {
    console.error(e);
  });
  return deleteData;
}
