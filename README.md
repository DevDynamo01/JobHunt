#JobHunt
## Job Scraper & Aggregator
## 🚀 Overview
This project scrapes job opening data from multiple platforms like **LinkedIn, Unstop, Wellfound, etc.**, and displays them on a **unified platform**. It utilizes **React** for the frontend, **Node.js & Express** for the backend, **MongoDB** as the database, **Selenium** for web scraping, and **Generative AI** to enhance job descriptions.
## ✨ Features
- 🔍 **Web Scraping**: Collects job listings from various websites.
- 📌 **Unified Job Board**: Displays jobs in a structured format.
- 📂 **Filtering & Searching**: Allows users to filter by company, role, location, etc.
- 🧠 **AI-Powered Insights**: Uses Generative AI to enhance job descriptions.
- 🔑 **Authentication**: Users can sign in/sign up to save job listings.
- 📊 **Dashboard & Analytics**: Provides insights into job trends.

## 🛠️ Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Web Scraping**: Selenium, Puppeteer
- **AI**: OpenAI API (or any other Generative AI model)

## 🔧 Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/job-scraper-platform.git
cd job-scraper-platform
```

### 2️⃣ Backend Setup (Node.js & Express)
```bash
cd backend
npm install
```

#### Configure environment variables
Create a `.env` file inside the `backend` folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key

```
### 3️⃣ Frontend Setup (React.js)
```bash
cd frontend
npm install
npm start

```
### 4️⃣ Web Scraping Setup
Ensure **Selenium WebDriver** is installed and set up correctly:
```bash
pip install selenium
```

Run the scraper:
```bash
python scraper.py

## 📌 Usage
1. Visit `http://localhost:3000`
2. Browse job listings from multiple platforms
3. Use filters to narrow down jobs
4. Click on job details to view AI-enhanced descriptions
5. Save jobs to your profile (if logged in)
```
## Frintend Architecture
![image](https://github.com/user-attachments/assets/90bf450a-fe0a-4472-a0bc-a91b4bc00614)
## Backend Architecture
![image](https://github.com/user-attachments/assets/7a16b26b-2ff5-4897-8d28-05c456e678db)
## Data Collection and Scrapping Architecture
![image](https://github.com/user-attachments/assets/07ad5da9-08cc-4c6e-8c1a-9545013bc0d1)

