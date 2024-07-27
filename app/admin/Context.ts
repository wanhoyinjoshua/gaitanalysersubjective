import { createContext } from 'react';
import { jsonprops } from '../components/analyser/interface';

export const editorJsonfileContext = createContext<jsonprops>({
  

    treatments:[],
    dispatchKd:null,
    dispatchImp:null,
    kinematic_deviations:[],
    impairments:[]
   


});