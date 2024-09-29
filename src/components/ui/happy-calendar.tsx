import { useMemo } from "react"
import * as dateFns from "date-fns"
import clsx from "clsx"

export type HappyCalendarProps = {
  scopeDate: Date
  happinessMap: Map<string, number>
}

export function HappyCalendar(props: HappyCalendarProps) {
  const calLimits = useMemo(() => {
    const monthStart = dateFns.startOfMonth(props.scopeDate)
    const monthEnd = dateFns.endOfMonth(props.scopeDate)
    const fistWeekStart = dateFns.startOfWeek(monthStart)
    const lastWeekEnd = dateFns.endOfWeek(monthEnd)
    const headPaddings = dateFns.differenceInDays(monthStart, fistWeekStart)
    const tailPaddings = dateFns.differenceInDays(lastWeekEnd, monthEnd)

    return {
      monthStart,
      monthEnd,
      fistWeekStart,
      lastWeekEnd,
      headPaddings,
      tailPaddings,
    }
  }, [props.scopeDate])

  console.log(calLimits)

  return (
    <div className="grid grid-cols-7 gap-1.5 p-4">
      {Array.from({ length: calLimits.headPaddings }).map((_, i) => (
        <div key={i} />
      ))}
      {Array.from({
        length:
          dateFns.differenceInDays(calLimits.monthEnd, calLimits.monthStart) +
          1,
      }).map((_, i) => {
        const date = dateFns.addDays(calLimits.monthStart, i)
        const dateIso = dateFns.formatISO(date, { representation: "date" })
        const happiness = props.happinessMap.get(dateIso)
        const isToday = dateFns.isToday(date)

        return (
          <div
            key={i}
            className={clsx(
              "grid aspect-square place-content-center text-lg rounded-lg",
              happiness === 1 && "bg-[#EF9097]",
              happiness === 2 && "bg-[#F7D2A1]",
              happiness === 3 && "bg-[#FFFDA1]",
              happiness === 4 && "bg-[#BCF5AC]",
              happiness === 5 && "bg-[#B4E5FF]",
              isToday && "border-2 border-dashed border-primary/50",
            )}
          >
            {date.getDate()}
          </div>
        )
      })}
      {Array.from({ length: calLimits.tailPaddings }).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  )
}
