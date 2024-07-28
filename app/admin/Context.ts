import { createContext } from 'react';
import { adminjson } from './Interfaces';

export const editorJsonfileContext = createContext<adminjson>({
  
    view:1,
    setView:null,
    treatments:[],
    dispatchKd:null,
    dispatchImp:null,
    kinematic_deviations:[],
    impairments:[]
   


});