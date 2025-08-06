# StudentStash

StudentStash is an all-in-one student productivity and finance app designed to help users engage with challenges, learn investing, track rewards, and chat with a Gen-Z style finance bro chatbot! It combines a React frontend with a powerful Python FastAPI backend serving a custom-finance LLM chatbot built on the WiroAI model.

---

## Features

- **Dashboard:** Overview of student progress and stats.
- **Challenges:** Gamified challenges for student engagement.
- **Challenge Details:** Drill down into individual challenges.
- **Rewards:** Track earned rewards and incentives.
- **Leaderboard:** See top students and their achievements.
- **Investing:** Educational content and investing tracking tools.
- **Learn:** Learning resources on finance and productivity.
- **Finance Bro Chatbot:** Chat with a BroBot offering finance advice styled in Gen-Z slang, powered by a local Hugging Face model.
- User authentication and theme switching (Gen-Z / Boomer modes).
- Responsive React frontend with React Router navigation.
- FastAPI backend with model serving and chat API.

---

## Project Structure
StudentStash/
├── backend/
│   ├── app.py                 # FastAPI backend serving chatbot API
│   ├── models/                # Folder for downloaded model(s)
│   │    └── wiroai/           # Finance model files
│   └── requirements.txt       # Backend Python dependencies
├── frontend/
│   ├── public/                # React public assets
│   ├── src/
│   │   ├── components/        # React components including FinanceBroChatBot
│   │   ├── pages/             # Pages like Dashboard, FinanceBro, Investing, etc.
│   │   ├── App.js             # Main React app and routing
│   │   ├── index.js           # React entry point
│   │   └── styles/            # CSS / SCSS files
│   ├── package.json           # Frontend dependencies and scripts
│   └── .gitignore             # Frontend gitignore
├── .gitignore                 # Root gitignore combining frontend/backend ignores
└── README.md                  # This file


---

## Prerequisites

- Python 3.10+
- Node.js 16+ and npm or yarn
- Git
- Minimum 8 GB RAM recommended for model loading.
- Recommended: virtual environments for Python.

---

## Backend Setup

1. Navigate to the backend directory:
cd backend
2. (Optional, recommended) Create and activate a Python virtual environment:
python -m venv .env
source .env/bin/activate # Linux/ma
3. Install backend dependencies:
pip install -r requirements.txt

If you don’t have `requirements.txt`, simply run:
pip install fastapi uvicorn transformers torch

4. Download the WiroAI Finance model into `backend/models/wiroai` folder via Hugging Face CLI or scripts.

5. Run the FastAPI backend server:

python -m uvicorn app:app --host 0.0.0.0 --port 8000
   The backend will serve the chatbot API at `http://localhost:8000/chat`.

---

## Frontend Setup

1. Navigate to the frontend directory:

cd ../frontend
2. Install frontend Node.js dependencies:
npm install
or
yarn

3. Start the React development server:

npm start

or
yarn start

4. Open your browser and go to:

http://localhost:3000/finance-bro

   to interact with your Finance Bro Chatbot!

---

## Usage

- Use the sidebar or navbar to navigate pages like Challenges, Rewards, Investing, and Learn.
- Visit `/finance-bro` to chat with the Gen-Z style Finance Bro Chatbot.
- Login/Logout handled via authentication page.
- Switch between GenZ and Boomer themes in the UI.
- Challenges, rewards, and leaderboard pages allow student engagement and tracking.
- FinanceBro chatbot provides lively financial advice through the backend model.

---
---

## Acknowledgments

- [Hugging Face](https://huggingface.co/) — transformers and model hosting  
- WiroAI team for the WiroAI-Finance-Qwen-1.5B model  
- FastAPI and React open-source communities  

---
## Contact

For questions, issues, or feature requests, open an issue or contact [aryamansharma4810@gmail.com] & [jai19kharb@gmail.com].

