import { config } from '../../_lib/http/config';
import axios from 'axios'


export const executionServiceProvider=async(data:any)=>{
    console.log(data,'geting the data in execution provider')
    console.log(process.env.EXECUTION_SERVICE,'execution service url ');

    const response = axios.post(`${process.env.EXECUTION_SERVICE}/code-excution`,data,config);
    console.log("🚀 ~ file: executionService.ts:10 ~ executionServiceProvider ~ response:", response)
    return 'oke the data is getting '
}