from fastapi import FastAPI
from pydantic import BaseModel
from typing import List,Dict,Any
from services.rag_service import RagServices
from fastapi.middleware.cors import CORSMiddleware

#env
#GENAI_KEY=AIzaSyCXINJDTp5tn_Fh6Ph30j1JQJ_m2pV6zE8
class Query(BaseModel):
    question:str

class Answer_response(BaseModel):
    answer: str
    sources: List[Dict[str,Any]]
    context_used: str




app = FastAPI(title= "Cardiology Research Paper RAG")

#initializing
rag_service =RagServices()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows ALL origins (for development only)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def home():
    return {"message" : "Cardiology rag api is running"}


@app.post("/ask" , response_model = Answer_response)
def ask_question(request: Query):
    result=rag_service.get_answer(request.question)
    return result



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port = 8000 , host= "0.0.0.0")

