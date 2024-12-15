import serverUrl from "./ServerUrl"
import CommonApi from "./CommonApi"

// register
export const registerApi=async(reqBody)=>{
    return await CommonApi("POST",`${serverUrl}/register`,reqBody)
}

// login
export const loginApi=async(reqBody)=>{
    return await CommonApi("POST",`${serverUrl}/login`,reqBody)
}

// add expense
export const addTaskApi=async(reqBody,reqHeader)=>{
    return await CommonApi("POST",`${serverUrl}/add-task`,reqBody,reqHeader)
}

// get pending tasks
export const getPendingTasksApi=async(reqHeader)=>{
    return await CommonApi("GET",`${serverUrl}/pending-task`,'',reqHeader)
};

// get high priority tasks
export const getHighPrioriTaskApi=async(reqHeader)=>{
    return await CommonApi("GET",`${serverUrl}/high-task`,'',reqHeader)
};

// get medium priority tasks
export const getMediumPrioriTaskApi=async(reqHeader)=>{
    return await CommonApi("GET",`${serverUrl}/medium-task`,'',reqHeader)
};

// get high priority tasks
export const getLowPrioriTaskApi=async(reqHeader)=>{
    return await CommonApi("GET",`${serverUrl}/low-task`,'',reqHeader)
};

// get completed tasks
export const getcompletedTaskApi=async(reqHeader)=>{
    return await CommonApi("GET",`${serverUrl}/completed-task`,'',reqHeader)
};

// delete tasks
export const deleteTaskApi=async(id,reqHeader)=>{
    return await CommonApi("DELETE",`${serverUrl}/${id}/delete-task`,{},reqHeader)
}

// edit tasks
export const EditTaskApi=async(id,reqBody,reqHeader)=>{
    return await CommonApi("PUT",`${serverUrl}/${id}/edit-task`,reqBody,reqHeader)
}

// update status
export const updateStatusApi=async(id,reqBody,reqHeader)=>{
    return await CommonApi("PUT",`${serverUrl}/${id}/update-task`,reqBody,reqHeader)
}