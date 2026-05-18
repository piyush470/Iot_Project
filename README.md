#IoT Project 2026

## Project Overview

SISTec IoT Application 2026 is a beginner-friendly IoT web application built using:

- HTML
- Tailwind CSS
- Node.js
- Express.js
- JSON Database
- ESP8266
- DHT11 Sensor
- 16x2 LCD with I2C

This project allows users to:

- Monitor temperature and humidity
- Store sensor records
- Display live sensor data on dashboard
- Send custom messages to LCD display
- Fetch LCD text using API
- Control and monitor IoT device remotely

---

# Features

## Authentication System
- User Registration
- User Login
- Session Management

---

## Dashboard Features

### Section 1
- Live Temperature Card
- Live Humidity Card
- Date & Time Display

### Section 2
- Send message to LCD display
- Maximum 16 characters
- Text saved in `lcd.txt`

### Section 3
- View all sensor records
- Delete sensor records
- Live data table

---

# Hardware Used

| Component | Quantity |
|---|---|
| ESP8266 NodeMCU | 1 |
| DHT11 Sensor | 1 |
| 16x2 LCD with I2C | 1 |
| Breadboard | 1 |
| Jumper Wires | Some |

---

# Sensor Connections

## DHT11

| DHT11 Pin | ESP8266 Pin |
|---|---|
| VCC | 3.3V |
| GND | GND |
| DATA | D5 |

---

## LCD I2C

| LCD Pin | ESP8266 Pin |
|---|---|
| VCC | VIN |
| GND | GND |
| SDA | D2 |
| SCL | D1 |

I2C Address:

```cpp
0x27
```

---

# Folder Structure

```text
project/
│
├── public/
│   ├── index.html
│   ├── register.html
│   └── dashboard.html
│
├── database/
│   ├── users.json
│   ├── data.json
│   └── lcd.txt
│
├── server.js
├── package.json
└── README.md
```

---
# Open Website

```text
https://sistec-iot-app.onrender.com/dashboard
```

---

# APIs

## API 1 — Save Sensor Data

### Endpoint

```text
/save-data
```

### Method
GET

### Example

```text
https://your-app.onrender.com/save-data?temperature=25&humidity=55
```

---

## API 2 — Fetch LCD Text

### Endpoint

```text
/get-lcd
```

### Method
GET

### Example

```text
https://your-app.onrender.com/get-lcd
```

---

# ESP8266 Features

- Connects to WiFi
- Reads DHT11 sensor
- Displays values on LCD
- Fetches LCD text from API
- Sends sensor data to server
- Uses HTTPS requests with:

```cpp
WiFiClientSecure
```

---

# Arduino Libraries Required

Install these libraries from Arduino IDE:

- ESP8266WiFi
- WiFiClientSecure
- DHT sensor library
- Adafruit Unified Sensor
- LiquidCrystal_I2C

---

# Render Deployment

## Build Command

```bash
npm install
```

## Start Command

```bash
node server.js
```

---

# Important Notes

## Render Free Plan Sleep Issue

Render free servers may sleep after inactivity.

### Solution
- Open website once before demo
OR
- Use uptime monitor

---

# Future Improvements

- Real-time charts
- Mobile app integration
- Firebase database
- MQTT support
- Notification system
- Admin dashboard
- AI analytics

---

# Developed By

SISTec Student IoT Project Team Bits 2026
