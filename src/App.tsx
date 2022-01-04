import { RecoilRoot } from 'recoil'
import { Products } from './Products'

export function App(): JSX.Element {
  return (
    <RecoilRoot>
      <Products />
    </RecoilRoot>
  )
}