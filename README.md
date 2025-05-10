# 🕒 Cron Expression Visualizer & Recurrence Pattern Generator

A powerful, developer-friendly web tool to visualise and understand cron expressions and generate recurrence patterns with human-readable descriptions. Built using React (TypeScript) or Angular, this tool helps users parse, validate, and interactively interpret scheduling syntax used in automation and task management systems.

## 🚀 Features

✅ Cron Expression Visualizer
Enter a 6-part cron expression (Seconds, Minutes, Hours, Day of Month, Month, Day of Week)

Real-time parsing of the expression into individual components

Highlights active fields

Supports month/day names (e.g., JAN, MON) and tolerates extra whitespace

Displays error state for invalid or incomplete expressions

✅ Recurrence Pattern Generator
Choose between Daily, Weekly, or Monthly patterns

Dynamically updates form inputs based on selected recurrence type

Generates a real-time, human-readable summary

Example (Daily): “Runs every day at 08:00 AM”

Example (Weekly): “Runs every week on Monday and Wednesday at 09:30 AM”

Example (Monthly): “Runs every month on the 15th at 10:00 AM”

## 🛠️ Tech Stack

You can implement this project in either of the following frameworks:

Option 1: React + TypeScript
React 18+

TypeScript

Tailwind CSS (or any modern styling solution)

State management via React Hooks

Option 2: Angular
Angular 16+

TypeScript

Angular Forms

SCSS or CSS Modules

## 📦 Installation & Setup

1. Clone the repository
```
git clone https://github.com/your-username/cron-visualizer.git
cd cron-visualizer
```
2. Install dependencies

For React:
```
npm install
```
For Angular:
```
npm install
```

3. Run the development server

For React:
```
npm start
```
For Angular:
```
ng serve
```

## 📄 Usage

🔹 Cron Expression Input
Type a valid 6-part cron expression in the input field:
```
0 15 12 1 JAN MON
```
🔹 Recurrence Pattern Selection
Select from:

Daily → Choose a time.

Weekly → Choose one or more days and a time.

Monthly → Choose a date and a time.

## 💡 Example Descriptions

Recurrence	              User Input	                           Output Description
Daily	                    08:00 AM	                          Runs every day at 08:00 AM
Weekly	             Mon, Wed at 09:30 AM	                    Runs every week on Monday and Wednesday at 09:30 AM
Monthly	          15th day of month at 10:00 AM            	Runs every month on the 15th at 10:00 AM

## Demo

![CE1](https://github.com/user-attachments/assets/cd4da5aa-521a-421a-92db-069561bf96d0)
![CE2](https://github.com/user-attachments/assets/e5f473b8-b277-4291-8918-76d1dc46f479)

## 🤝 Contributing
Fork the repo

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Request

## 📄 License
This project is licensed under the MIT License.

## 🙋‍♀️ Built With Love By

# Roshni Kumari💗
🌐 LinkedIn: roshnikumari1 
🐙 GitHub: RSN601KRI

