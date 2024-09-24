import { config } from '../../_lib/http/config';
import axios from 'axios'


export const executionServiceProvider=async(data:any)=>{
    console.log(data,'geting the data in execution provider')
    console.log(process.env.EXECUTION_SERVICE,'execution service url ');

    try {
      const response = await axios.post(
        `http://localhost:2001/api/execution/code-execution`,
        data,
        config
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in executionServiceProvider:", error);
      throw error; // Re-throw the error so it can be caught in the controller
    }
    
}