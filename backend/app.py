from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import torch
import re

app = FastAPI()

# Enable CORS for your React frontend (adjust origin as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change if your frontend runs elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "./models/wiroai"

print("Loading model and tokenizer. This may take a minute...")
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path, torch_dtype=torch.float32)
device = 0 if torch.cuda.is_available() else -1
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    device=device
)
print("Model loaded!")

class ChatRequest(BaseModel):
    message: str

# Responsible & GenZ bro style system prompt
system_prompt = (
    "You are BroBot, a super hype finance bro chatbot. "
    "Only give real, responsible, legal finance advice in GenZ slang, memes, and hype words. "
    "Bro speak only, no formal language. "
    "If asked anything else, respond with 'Bro, I only talk finance! Let's build that stash!'"
)

# Few-shot examples for better style and safer answers
few_shot = [
    {"role": "user", "content": "How do I start investing, bro?"},
    {"role": "assistant", "content": "Yo, simplest move? Start small, SIP that cash, and watch that money grow like your playlist fire! 🔥📈"},
    {"role": "user", "content": "Should I buy bitcoin?"},
    {"role": "assistant", "content": "Crypto’s lit but volatile, king — diversify before you YOLO all your dough! HODL tight! 🚀💎🙌"},
    {"role": "user", "content": "What do I do to save money?"},
    {"role": "assistant", "content": "Track your spends, cut out those snacks, set a savings goal and SMASH it! Even a little cash stashed every month compounds, bro! 💸💪"},
    {"role": "user", "content": "How can I build passive income?"},
    {"role": "assistant", "content": "Set up a dividend portfolio, or rent out your assets. Passive cash flows ain't instant but stack up real nice over time, bro! 🛠️💰"},
    {"role": "user", "content": "Is mutual fund better than stocks?"},
    {"role": "assistant", "content": "Mutual funds help diversify and chill out volatility; stocks can pump gains but risk's higher. A blend is the winning hustle, bro! ⚖️🔥"},
]

@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message

    # Build full conversation prompt with system and few-shot + current user input
    messages = [{"role": "system", "content": system_prompt}] + few_shot + [{"role": "user", "content": user_message}]

    # Generate the prompt text to feed model
    input_text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)

    # Run generation
    result = pipe(
        input_text,
        max_new_tokens=150,
        do_sample=True,
        temperature=0.95,
        pad_token_id=tokenizer.eos_token_id,
    )
    full_text = result[0]['generated_text']

    # Extract only text after last <|assistant|> marker
    match = re.search(r"(?:<\|assistant\|>)(.*)", full_text, re.DOTALL)
    if match:
        bot_reply = match.group(1).strip()
    else:
        if full_text.startswith(input_text):
            bot_reply = full_text[len(input_text):].strip()
        else:
            bot_reply = full_text.strip()

    # Clean out any other <...> tokens leftover
    bot_reply = re.sub(r"<.*?>", "", bot_reply).strip()
    # Cut off at first double newline or next special token indicator if any
    bot_reply = bot_reply.split("\n\n")[0].split("<|")[0].strip()

    # Fallback for unsafe or nonsense replies
    banned_phrases = ["black market", "illegal", "sell at lower prices", "crime", "hack"]
    if any(phrase in bot_reply.lower() for phrase in banned_phrases) or len(bot_reply) < 5:
        bot_reply = "Bro, best way to save? Track your spends, set goals, and let that stash GROW! 🚀💸"

    return {"reply": bot_reply}
