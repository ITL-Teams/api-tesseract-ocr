import { CurrentDate } from '../../src/services/CurrentDate'
import { expect } from 'chai'

// TEST CONFIG
type DateComponents = {
  day: string
  month: string
  year: string
}

function getDateComponents(time?: number): DateComponents {
  let dateService: CurrentDate
  if (time) dateService = new CurrentDate(time)
  else dateService = new CurrentDate()
  const fulldate = dateService.invoke().split('/')
  const day = fulldate[0]
  const month = fulldate[1]
  const year = fulldate[2]

  return {
    day: day,
    month: month,
    year: year
  }
}

// TEST COMPONENT
describe('Services::CurrentDate', () => {
  it('match day format', () => {
    let date = getDateComponents(1577858400000) // Jan 1st, 2020
    expect(date.day).to.be.equals('01')

    date = getDateComponents(1578549600000) // Jan 9th, 2020
    expect(date.day).to.be.equals('09')

    date = getDateComponents(1578636000000) // Jan 10th, 2020
    expect(date.day).to.be.equals('10')

    date = getDateComponents(1579500000000) // Jan 20th, 2020
    expect(date.day).to.be.equals('20')
  })

  it('match month format', () => {
    let date = getDateComponents(1577858400000) // Jan 1st, 2020
    expect(date.month).to.be.equals('01')

    date = getDateComponents(1598936400000) // Sep 1st, 2020
    expect(date.month).to.be.equals('09')

    date = getDateComponents(1601528400000) // Oct 1st, 2020
    expect(date.month).to.be.equals('10')

    date = getDateComponents(1606802400000) // Dec 1st, 2020
    expect(date.month).to.be.equals('12')
  })

  it('match year format', () => {
    let date = getDateComponents(1577858400000) // Jan 1st, 2020
    expect(date.year).to.be.equals('2020')
  })

  it('match current date', () => {
    const current = new Date()
    let dateService = getDateComponents() // current

    expect(dateService.year).to.be.equals(current.getFullYear().toString())

    if (current.getMonth() < 10)
      expect(dateService.month).to.be.equals(`0${current.getMonth() + 1}`)
    else expect(dateService.month).to.be.equals(`${current.getMonth() + 1}`)

    if (current.getDate() < 10)
      expect(dateService.day).to.be.equals(`0${current.getDate()}`)
    else expect(dateService.day).to.be.equals(`${current.getDate()}`)
  })
})
