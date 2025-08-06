from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

model_dir = "./models/wiroai"  # your local path where model is downloaded

pipe = pipeline(
    "text-generation",
    model=model_dir,
    tokenizer=model_dir,
    device_map="auto",  # will use GPU if available
    model_kwargs={"torch_dtype": torch.bfloat16 if torch.cuda.is_available() else torch.float32}
)

# Bro-style, finance-focused prompt
messages = [
    {"role": "system", "content": "You are BroBot, a finance bro chatbot. ONLY answer finance-related questions and use bro slang."},
    {"role": "user", "content": "How can I double my investment, bro?"}
]
input_text = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
out = pipe(input_text, max_new_tokens=150, do_sample=True, temperature=0.95)
print(out[0]['generated_text'])
