from fastapi import FastAPI  
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address


app = FastAPI()
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

apiUrl = "http://localhost:11434/api/chat"


@app.post("/api/chat")
@limiter.limit("5/minute") 
async def chat_endpoint(request: dict):
   
    import requests

    response = requests.post(apiUrl, json=request)
    return response.json()
