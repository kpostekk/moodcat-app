import CircularSlider from "@fseehawer/react-circular-slider"
import Gradient from "javascript-color-gradient"

import { useEffect, useMemo, useState } from "react"

function numToEmoji(num: number) {
  if (num < 5) {
    // return "🤤"
    return "Very good"
  }
  if (num < 20) {
    // return "😁"
    return "Good"
  }
  if (num < 30) {
    // return "😀"
    return "Okay"
  }
  if (num < 40) {
    // return "😑"
    return "Bad"
  }
  if (num < 45) {
    // return "😭"
    return "Very bad"
  }
  // return "😡"
  return "Terrible"
}

export type CustomCircularSliderProps = {
  initValue?: number
  onChange?: (value: number) => void
}

export function CustomCircularSlider(props: CustomCircularSliderProps) {
  const [value, setValue] = useState(props.initValue ?? 0)
  const gradient = useMemo(() => {
    return new Gradient()
      .setColorGradient("#A1CEC9", "#d1ca7d", "#c44545")
      .setMidpoint(51)
      .getColors()
  }, [])

  useEffect(() => {
    props.onChange?.(value)
  }, [props, value])

  return (
    <div className="p-8">
      <div className="relative h-64 w-64">
        <div className="absolute grid h-full w-full place-content-center p-4">
          <span className="select-none text-xl text-primary">
            {numToEmoji(value)}
          </span>
        </div>
        <CircularSlider
          min={0}
          max={50}
          onChange={(value: number) => setValue(value)}
          progressColorFrom={gradient[value]}
          progressColorTo={gradient[value]}
          knobPosition="top"
          progressSize={12}
          valueFontSize="4rem"
          trackSize={0}
          renderLabelValue={<></>}
          width={256}
        />
      </div>
    </div>
  )
}
