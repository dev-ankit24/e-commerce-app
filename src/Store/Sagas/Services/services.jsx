export async function createRecord(collection,payload){
  let response = await fetch(`/${collection}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });
      return await response.json();
}

// ****** form data API call
export async function createRecordformData(collection,payload){
  let response = await fetch(`/${collection}`, {
        method: "POST",
        headers: {
        },
        body:payload 
      });
      return await response.json();
}

export async function getRecord(collection){
    let response = await fetch(`/${collection}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
      });
      return await response.json();
}

export async function updateRecord(collection,payload){
    let response = await fetch(`/${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });
      return await response.json();
}

// ****** form data update API call
export async function updateRecordFormData(collection,payload){
  let response = await fetch(`/${collection}/${payload.get('id')}`, {
      method: "PUT",
      headers: {
      },
      body: payload
    });
    return await response.json();
}

export async function deleteRecord(collection, payload){
    let response = await fetch(`/${collection}/${payload.id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({...payload }),
      });
      return await response.json();
}