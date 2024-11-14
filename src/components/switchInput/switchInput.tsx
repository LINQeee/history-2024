import classes from './switchInput.module.sass'
import { FC } from 'react'

interface SwitchInputProps {
  label: string
  onChange: (val: boolean) => void
  value: boolean
}

export const SwitchInput: FC<SwitchInputProps> = ({
  label,
  onChange,
  value,
}) => {
  return (
    <div className={classes.inputBox}>
      <label>{label}</label>
      <input
        checked={value}
        type={'checkbox'}
        onChange={(e) => {
          if (e.target.checked) e.target.classList.add(classes.checked)
          else e.target.classList.remove(classes.checked)

          onChange(e.target.checked)
        }}
      />
    </div>
  )
}
