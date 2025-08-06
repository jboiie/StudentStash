# Finance Bro Chatbot

A finance-focused chatbot with a Gen Z bro style personality that answers only finance-related questions using hype slang and memes.  
Powered by the WiroAI-Finance-Qwen-1.5B model from Hugging Face, served with a FastAPI backend and a React frontend.  

---

## Features

- Download and host your own local WiroAI Finance model.
- Bro-style Gen Z slang responses focused on real, responsible financial advice.
- Easy React UI chatbot integrated with a FastAPI backend.
- Cleaner, safer, and user-friendly conversations with prompt engineering and reply filtering.
- CORS enabled backend for seamless frontend-backend communication.
- Can be extended/deployed anywhere — local or cloud.

---

## Project Structure

StudentStash/
├── backend/
│ ├── app.py # FastAPI backend serving chat API
│ └── models/
│ └── wiroai/ # Downloaded Hugging Face model files
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── FinanceBroChatBot.js # React chat UI
│ │ ├── pages/
│ │ │ └── FinanceBro.js # Chatbot page wrapper
│ │ └── App.js # React router and app layout
│ ├── package.json # React dependencies & scripts
│ └── ... # Other React config files
└── .gitignore # Git ignore file

## Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 16+ and npm/yarn
- Git (for version control and cloning)
- At least 8+ GB RAM recommended for model loading (CPU/GPU)

---

### Backend Setup

1. Navigate to the backend folder:

cd backend

2. Create a Python environment (optional but recommended):

python -m venv .env

Activate virtual env:
source .env/bin/activate # Linux/macOS
..env\Scripts\activate # Windows PowerShell

3. Install required Python packages:

pip install -r requirements.txt

If you don’t have `requirements.txt`, just run:

pip install fastapi uvicorn transformers torch

4. Download the model files into `backend/models/wiroai` using the `huggingface_hub` CLI or Python script as described in your project.

5. Run the FastAPI backend server:

python -m uvicorn app:app --host 0.0.0.0 --port 8000

### Frontend Setup

1. Navigate to the frontend folder:

cd ../frontend

2. Install Node.js dependencies:

npm install

or
yarn

3. Start the React app:

npm start

or
yarn start

4. Open your browser and go to:

http://localhost:3000/finance-bro

to interact with your Finance Bro Chatbot!


## Usage

- Type your finance-related question in the chat UI.
- BroBot responds with Gen Z style finance advice.
- Non-finance questions get a friendly redirect message.
- Works entirely locally; no external API calls after model download.

---

## Notes & Tips

- The React frontend calls `http://localhost:8000/chat` so ensure backend & frontend ports match CORS settings.
- Adjust `app.py` CORS origins if running frontend on a different URL.
- The model is large; expect some RAM and CPU usage during startup.
- Extend few-shot prompts or fine-tune model to adjust style or domain further.
- When deploying, exclude `/backend/models/wiroai` from git if large; download models separately in deployment.

---

## License

Specify your project license here (e.g., MIT License).

---

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for transformers and model hosting.
- WiroAI team for the Finance-Qwen-1.5B model.
- FastAPI and React open-source communities.

---

## Contact

For questions, issues, or feature requests, open an issue or contact [aryamansharma4810@gmail.com] & [jai19kharb@gmail.com].

