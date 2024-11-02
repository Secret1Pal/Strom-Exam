import {ref} from "vue"
import axios from "axios";

axios.defaults.withCredentials = true;

const useRequestData = () => {
    const isLoading = ref(false)
    const data = ref(null)
    const error = ref(null)

    const makeRequest = async (apiurl, method = "GET", bodydata = null, headers = null, params = null) => {
        isLoading.value = true
        try {
            
            //await new Promise(resolve => setTimeout(resolve, 1500))

            let response;

            switch(method){
                case "GET":
                    response = await axios.get(apiurl, { headers, params});
                    break
                
                case "POST":
                    response = await axios.post(apiurl, bodydata, {headers})
                    break

                case "PUT":
                    response = await axios.put(apiurl, bodydata, {headers, params})
                    break

                case "PATCH":
                    response = await axios.patch(apiurl, bodydata, {headers, params})
                    break

                case "DELETE":
                    response = await axios.delete(apiurl, {headers, params})
                    break

                default:
                    throw new Error("Invalid method = HTTP method doesn't exist")
            }

            if(response.data){
                data.value = response.data
                error.value = null
            } else {
                throw new Error("Empty response/No data")
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                error.value = err.response?.data?.message || err.message || "Error occured"
            } else if (err instanceof Error) {
                error.value = err.message
            } else {
                error.value = "An unknown error ocurred"
            }
            data.value = null
        } finally {
            isLoading.value = false
        }
    }

    return {data, isLoading, error, makeRequest}
}

export default useRequestData