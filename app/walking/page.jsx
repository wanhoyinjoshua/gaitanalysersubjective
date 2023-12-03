'use client'
import React from 'react'
import CIcon from '@coreui/icons-react';
import Analyser from '../components/analyser/Analyser';
import json from "../jsonfiles/jsonstore.json"
import * as icon from '@coreui/icons';
const page = () => {
  return (
    <div>
       

    <Analyser json={json}></Analyser>

    </div>
  )
}

export default page