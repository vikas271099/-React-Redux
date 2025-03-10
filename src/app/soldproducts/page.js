"use client"
import React from 'react'
import Homepage from '../components/Homepage'
import { Provider } from 'react-redux'
import { store } from '../store/store'

const SoldProducts = () => {
  return (
    <div>
      <Provider store={store}>
      <Homepage Items={"sold"}/>
      </Provider>
    </div>
  )
}

export default SoldProducts
