export async function createQueue(payload) {
  try {
    let response = await fetch('/api/Queues/createQueueAndPrompts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    return {error}
  }
}

export async function updateQueue(payload) {
  console.log('updating queue', payload)
  try {
    let response = await fetch(`/api/Queues/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload.data)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    return {error}
  }
}

export async function getQueue(id) {
  console.log('Getting queue -- ' + id)
  try {
    let response = await fetch('/api/Queues/' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      },
    });
    
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    return {error}
  }
}

export async function getQueues() {
  console.log('Getting queues')
  try {
    let response = await fetch('/api/queues/getAllQueuesWithStatus', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      },
    });
    
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    return {error}
  }
}

export async function deleteQueue(payload) {
  console.log('Deleting queue -- ', payload)
  try {
    let response = await fetch(`/api/Queues/${payload}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json()
    console.log('Response json', responseJson)
    return responseJson
  } catch (error) {
    return {error}
  }
}

export async function optionalPromptToggle(payload) {
  console.log('optionalPromptToggle -- ', payload)
  try {
    let response = await fetch('/api/Queues/optionalPromptToggle', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    console.log('Response json optional', responseJson)
    return responseJson
  } catch (error) {
    return {error}
  }
}

export async function queueForceCloseToggle(payload) {
  console.log('queueForceCloseToggle -- ', payload)
  try {
    let response = await fetch('/api/Queues/forceCloseToggle', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    return {error}
  }
}

