import { createContext } from 'react';
import {context_props } from './interface';

export const importedJsonfileContext = createContext<context_props>({
  json:{treatments:[],
    
    kinematic_deviations:[],
    impairments:[],
    setting:{}
  },
    selected_observations:[],
    selectedimpairment:[],
    skippedimpairments:[],
    setSelectedImpairment:null,
    stage2history:[0],
    setStage2Hx:null,
  setSkippedimpairments:null,
  setObservations:null,
  setStage:null,
  testingeliminatedhx:{},
  setSkipperq:null,
  stageController:null




});