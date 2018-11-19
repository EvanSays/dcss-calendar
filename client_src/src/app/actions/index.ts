export const incrementCounter = num => ({ type: "INCREMENT_COUNTER", payload: num });

export const sendRouteComponent = component => ({ type: "CHANGE_ROUTE_COMPONENT", payload: component });

export const updateChecked = obj => ({ type: "UPDATE_CHECKED", payload: obj });

export const deleteRow = obj => ({ type: "DELETE_ROW", payload: obj });

export const addScheduleSelect = () => ({ type: "ADD_SCHEDULE_SELECT" });

export const requestScheduleSubmit = obj => ({ type: "REQUEST_SCHEDULE_SUBMIT", payload: obj });

export const updateNameField = obj => ({ type: "UPDATE_NAME_FIELD", payload: obj });

export const updateOpenClosedTime = obj => ({ type: "UPDATE_OPEN_CLOSED_TIME", payload: obj })

export const requestGetQueues = () => ({ type: "REQUEST_GET_QUEUES" });

export const requestGetSchedules = () => ({ type: "REQUEST_GET_SCHEDULES" });


export const updateTimeRanges = (obj) => ({ type: "UPDATE_TIME_RANGES", payload: obj });

export const requestAddQueueSubmit = obj => ({ type: "REQUEST_ADD_QUEUE_SUBMIT", payload: obj });

export const requestAddQueueUpdate = obj => ({ type: "REQUEST_ADD_QUEUE_UPDATE", payload: obj });

export const handleAddQueueChange = (obj) => ({ type: "UPDATE_ADD_QUEUE_STATE", payload: obj });

export const addSelectedQueue = (obj) => ({ type: "ADD_SELECTED_QUEUE", payload: obj });

export const clearSelectedQueue = () => ({ type: "CLEAR_SELECTED_QUEUE" });



export const requestGetHolidayLists         = ()  => ({type: "REQUEST_GET_HOLIDAY_LISTS"});
export const addHoliday                     = ()  => ({type: "ADD_HOLIDAY"});
export const requestGetHolidayList          = obj => ({type: "REQUEST_GET_HOLIDAY_LIST", payload: obj});
export const changeHolidayListName          = obj => ({type: "CHANGE_HOLIDAY_LIST_NAME", payload: obj});
export const changeHolidayName              = obj => ({type: "CHANGE_HOLIDAY_NAME", payload: obj});
export const changeHolidayDate              = obj => ({type: "CHANGE_HOLIDAY_DATE", payload: obj});
export const deleteHoliday                  = obj => ({type: "DELETE_HOLIDAY", payload: obj});
export const requestNewHolidayListSubmit    = obj => ({type: "REQUEST_NEW_HOLIDAY_LIST_SUBMIT", payload: obj });
export const requestUpdateHolidayListSubmit = obj => ({type: "REQUEST_UPDATE_HOLIDAY_LIST_SUBMIT", payload: obj });

