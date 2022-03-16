import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

export const api = "https://anjali1196.pythonanywhere.com"
export const apiV1 = "http://localhost:33000"

export const website = "https://localhost:3000"

export const timeAgo = new TimeAgo('en-US')

export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

