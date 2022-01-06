import React from 'react'
import { RecoilRoot } from 'recoil'
import { Products } from './Products'

export function App(): JSX.Element {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>LOADING...</div>}>
        <Products />
      </React.Suspense>
    </RecoilRoot>
  )
}