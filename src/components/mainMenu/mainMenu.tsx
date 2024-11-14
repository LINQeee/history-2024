import { SwitchInput } from '../switchInput/switchInput.tsx'
import classes from './mainMenu.module.sass'
import { useState } from 'react'
import { NumberInput } from '../numberInput/numberInput.tsx'
import { useNavigate } from 'react-router'

export const MainMenu = () => {
  const [datesEnabled, setDatesEnabled] = useState<boolean>(false)
  const [termsEnabled, setTermsEnabled] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const navigate = useNavigate()

  return (
    <div className={classes.menuBox}>
      <h1>{'Adyuha Pluha\nHistory Trainer'}</h1>
      <SwitchInput
        label={'Даты'}
        value={datesEnabled}
        onChange={setDatesEnabled}
      />
      <SwitchInput
        label={'Термины'}
        value={termsEnabled}
        onChange={setTermsEnabled}
      />
      <NumberInput
        value={count}
        onChange={setCount}
        label={'Кол-во, 0 - все (минимум 4)'}
      />
      <button
        disabled={
          (count !== 0 && count < 4) || (!datesEnabled && !termsEnabled)
        }
        onClick={() =>
          navigate(
            `/test?dates=${datesEnabled}&terms=${termsEnabled}&count=${count}`,
          )
        }
      >
        Начать
      </button>
    </div>
  )
}
