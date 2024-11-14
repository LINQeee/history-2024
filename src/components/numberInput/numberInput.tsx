import { FC } from 'react'
import classes from './numberInput.module.sass'

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  label: string
}

export const NumberInput: FC<NumberInputProps> = ({
  onChange,
  value,
  label,
}) => {
  return (
    <div className={classes.inputBox}>
      <label>{label}</label>
      <input
        type={'number'}
        onChange={(e) => onChange(+e.target.value)}
        value={value.toString()}
      />
    </div>
  )
}
