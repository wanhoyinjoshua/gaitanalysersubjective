import { createContext } from 'react';
import {context_props } from './interface';

export const importedJsonfileContext = createContext<context_props>({
  json:{treatments:[],
    kinematic_deviations:[],
    impairments:[]},
    selected_observations:[],
    selectedimpairment:[],
    skippedimpairments:[],
    setSelectedImpairment:null,
  setSkippedimpairments:null,
  setObservations:null,
  setStage:null,
  testingeliminatedhx:{},
  setSkipperq:null,
  stageController:null




});