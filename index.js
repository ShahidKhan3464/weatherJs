const searchCity = document.getElementById('searchCity')
const searchBtn = document.getElementById('searchBtn')
const currentDate = document.getElementById('date')
const currentLocation = document.getElementById('location')
const temp = document.getElementById('temp')
let weather = document.getElementById('weatherCon')
let peshawar = undefined  // declare undefined, Therefore to show weather before searching the weather for the specific city 
let tempStatus = ''

// To search the weather of the city
searchBtn.addEventListener('click', () => {
    let city = searchCity.value
    if (city == '') {
        alert('please enter the city')
    } else {
        searchCity.value = ''
        getTemp(city)
    }
})

// Function to get the temperature of given city
const getTemp = async (city) => {
    if (city == undefined) {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=peshawar&appid=${process.env.MY_WeatherId}`
        let data = await fetch(url)
        let res = await data.json()
        let arr = [res]

        arr.map((val) => {
            let kelvin = val.main.temp
            let celsius = kelvin - 273.15    // formula to get temperature in centigrade
            var tempStatus = val.weather[0].main

            temp.innerHTML = celsius.toFixed(0) + '&degC'
            currentLocation.innerHTML = `${val.name}, ${val.sys.country}`

            if (tempStatus == 'Clear') {
                weatherCon.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
            }
            else if (tempStatus == 'Clouds') {
                weatherCon.innerHTML = "<i class='fas fa-cloud' style='color: ##ffffffc9'></i>"
            }
            else if (tempStatus == 'Rain') {
                weatherCon.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>"
            }
            else if (tempStatus == 'Smoke') {
                weatherCon.innerHTML = "<i class='fas fa-smoke' style='color: #d5bebe'></i>"
            }
            else {
                weatherCon.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
            }
        })
    }
    else {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4ba5cab1e7cf8891ffad0bc01bc6888`
        let data = await fetch(url)
        let status = data.ok
        if (status) {
            let res = await data.json()
            let arr = [res]

            arr.map((val) => {
                let kelvin = val.main.temp
                let celsius = kelvin - 273.15    // formula to get temperature in centigrade
                let tempStatus = val.weather[0].main
                console.log(tempStatus)

                temp.innerHTML = celsius.toFixed(0) + '&degC'
                currentLocation.innerHTML = `${val.name}, ${val.sys.country}`

                if (tempStatus == 'Clear') {
                    weatherCon.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
                }
                else if (tempStatus == 'Clouds') {
                    weatherCon.innerHTML = "<i class='fas fa-cloud' style='color: #ffffffc9'></i>"
                }
                else if (tempStatus == 'Rain') {
                    weatherCon.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>"
                }
                else if (tempStatus == 'Smoke') {
                    weatherCon.innerHTML = "<i class='fas fa-smoke' style='color: #d5bebe'></i>"
                }
                else {
                    weatherCon.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
                }
            })
        }
        else {
            alert('City not found')
        }
    }
}

getTemp(peshawar)   // Call here to show weather on the screen before searching for the specific city

const getCurrentTime = () => {
    let weekDay = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]
    let months = [
        'Jan',
        'Feb',
        'Mar',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]

    let currentTime = new Date()

    let day = weekDay[currentTime.getDay()]
    let month = months[currentTime.getMonth()]
    let date = currentTime.getDate()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    let period = 'AM'

    if (hours > 11) {
        period = 'PM'
        if (hours > 12) {
            hours -= 12
        }
    }

    if (hours < 10) {
        hours = '0' + hours
    }

    let str = `${day} | ${month} | ${date} | ${hours}:${minutes}:${period} `
    return str
}

date.innerHTML = getCurrentTime();
