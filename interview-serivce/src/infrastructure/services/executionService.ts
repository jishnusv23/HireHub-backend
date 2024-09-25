import { config } from '../../_lib/http/config';
import axios from 'axios'


export const executionServiceProvider=async(data:any)=>{
    console.log(data,'geting the data in execution provider')
    console.log(process.env.EXECUTION_SERVICE,'execution service url ');

    try {
      const response = await axios.post(
        `${process.env.EXECUTION_SERVICE}/code-excution`,
        data,
        config
      );
      console.log("Response:", response.data);
      // return response.data;
    } catch (error:any) {
      console.error("Error in executionServiceProvider:", error?.message);
      throw error; 
    }
    
}