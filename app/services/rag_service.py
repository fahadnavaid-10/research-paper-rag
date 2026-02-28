import os 
import chromadb
from chromadb.utils import embedding_functions
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()

class RagServices:
    def __init__(self):
        #importing api key
        api_key = os.getenv("GENAI_KEY")

        if not api_key:
            raise ValueError("GENAI_KEY environment variable not set")

        genai.configure(api_key = api_key)
        self.model = genai.GenerativeModel("gemini-flash-latest")

        #connecting to databse 
        self.client = chromadb.PersistentClient(path = "./chroma_db")
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name = "all-MiniLM-L6-v2")

        #making a collection
        self.collection = self.client.get_collection(
            name = "medical-research-paper",
            embedding_function = self.embedding_fn
        )

    #getting answer from rag pipeline
    def get_answer(self, query: str) -> str:
        
        print( f"Searching for query: {query}")


        # retreiving releevant chunks
        results = self.collection.query(
            query_texts = [query],
            n_results = 1 # top 1 best match chunks milengy
        )
        print(results)

        #clearing the chunks 
        docs = results['documents'][0]
        source = results['metadatas'][0]

        if not docs:
            return {
                "answer": "I'm sorry",
                "sources" : []
            }

        #to join all the chunks from docs list in a representable way so mai dalunga \n\n
        context_text = "\n\n".join(docs)


        prompt = f"""
        You are an expert Medical Research Assistant. 
        Use the following CONTEXT from research papers to answer the question strictly.
        
        - If the answer is not in the context, state that you don't know based on the papers.
        - Do not hallucinate medical advice.
        - Cite the paper names if possible.

        CONTEXT:
        {context_text}

        USER QUESTION: 
        {query}
        """


        #generating answer
        response = self.model.generate_content(prompt)

        return {
            "answer" : response.text,
            "sources": source,
            "context_used" : context_text
        }