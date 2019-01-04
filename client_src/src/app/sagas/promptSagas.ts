import { call, put } from 'redux-saga/effects'
import { updatePrompt, getPrompts, getPromptsWithQueueId, getPrompt, deletePrompt, createPrompts, clearPrompt } from './api-prompts'

export function* callGetPrompts() {
  const result = yield call(getPrompts)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    console.log("prompt result", result)
  }
}

export function* callGetPrompt(action) {
  const result = yield call(getPrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    console.log("callGetPrompt result", result)
  }
}

export function* callGetPromptsWithQueueId(action) {
  const result = yield call(getPromptsWithQueueId, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    if(result.length){
      yield put({type:"UPDATE_PROMPTS", payload: result})
    }
    console.log("callGetPromptsWithQueueId result", result)
  }
}

export function* callUpdatePrompt(action) {
  const result = yield call(updatePrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    // yield call(callGetPrompts)
    yield call(callGetPromptsWithQueueId, {payload: result.res.queueId})
    console.log("updatePrompt result", result)
  }
}

export function* callDeletePrompt(action) {
  const result = yield call(deletePrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield call(callGetPromptsWithQueueId, {payload: result.status.queueId})
    console.log("callDeletePrompt result", result)
  }
}

export function* callCreatePrompts(action) {
  const result = yield call(createPrompts, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield call(callGetPromptsWithQueueId, {payload: result.status[0].queueId})
    console.log("callCreatePrompts result", result)
  }
}

export function* callClearPrompt(action) {
  const result = yield call(clearPrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield call(callGetPromptsWithQueueId, {payload: result.status.queueId})
    console.log("callCreatePrompts result", result)
  }
}

