import chalk from 'chalk'
import { select, input } from '@inquirer/prompts'

const TIMEZONES = [
  { name: 'UTC+0  : London, Lisbon', value: 0 },
  { name: 'UTC-5  : New York, Toronto', value: -5 },
  { name: 'UTC-6  : Chicago, Mexico City', value: -6 },
  { name: 'UTC-7  : Denver, Phoenix', value: -7 },
  { name: 'UTC-8  : Los Angeles, Vancouver', value: -8 },
  { name: 'UTC+1  : Paris, Berlin, Rome', value: 1 },
  { name: 'UTC+2  : Cairo, Kyiv, Helsinki', value: 2 },
  { name: 'UTC+3  : Istanbul, Moscow, Riyadh', value: 3 },
  { name: 'UTC+4  : Dubai, Baku', value: 4 },
  { name: 'UTC+5  : Karachi, Tashkent', value: 5 },
  { name: 'UTC+5:30 : Mumbai, Kolkata', value: 5.5 },
  { name: 'UTC+6  : Dhaka, Almaty', value: 6 },
  { name: 'UTC+7  : Bangkok, Jakarta', value: 7 },
  { name: 'UTC+8  : Singapore, Beijing, Perth', value: 8 },
  { name: 'UTC+9  : Tokyo, Seoul', value: 9 },
  { name: 'UTC+10 : Sydney, Melbourne', value: 10 },
  { name: 'UTC+12 : Auckland', value: 12 },
]

function toUtcHour(localHour, offsetHours) {
  const utc = ((localHour - offsetHours) % 24 + 24) % 24
  return Math.round(utc)
}

function fmt(h) {
  return `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`
}

async function askHour(label) {
  const raw = await input({
    message: `  ${label} (0-23, e.g. 9 for 9am)`,
    validate: (v) => {
      const n = Number(v)
      if (isNaN(n) || n < 0 || n > 23) return 'Enter a number between 0 and 23'
      return true
    },
  })
  return Number(raw)
}

export async function collectSchedule() {
  console.log(chalk.bold('  Schedule'))
  console.log()
  console.log(chalk.dim('  Choose when the agent checks for tasks each day.'))
  console.log()

  const offset = await select({
    message: '  Your timezone',
    choices: TIMEZONES,
    pageSize: 10,
  })

  console.log()

  const count = await select({
    message: '  How many times per day should the agent run?',
    choices: [
      { name: '1 time', value: 1 },
      { name: '2 times', value: 2 },
      { name: '3 times', value: 3 },
      { name: '4 times', value: 4 },
    ],
  })

  console.log()

  const ordinals = ['First', 'Second', 'Third', 'Fourth']
  const hours = []

  for (let i = 0; i < count; i++) {
    const hour = await askHour(`${ordinals[i]} run time`)
    hours.push(hour)
    console.log()
  }

  const crons = hours.map(h => `0 ${toUtcHour(h, offset)} * * *`)

  const timeList = hours.map(fmt).join(', ')
  console.log(chalk.dim(`  Agent will run at ${timeList} your time.`))
  console.log()

  return { crons }
}
