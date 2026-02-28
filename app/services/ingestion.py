import os 
import chromadb
from chromadb.utils import embedding_functions
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter

class IngestionService:
    def __init__(self):

        #connecting to databse
        self.client = chromadb.PersistentClient(path= "./chroma_db")



        #embedding setup , translator ... it will transform text into numbers ... here ig 384 dimesion vector it will make
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name = "all-MiniLM-L6-v2")

        #making a collection
        self.collection = self.client.get_or_create_collection(
            name = "medical-research-paper",
            embedding_function = self.embedding_fn
        )

        #text text_splitter

        #making chunks of text

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size = 1000,
            chunk_overlap = 200,
            separators = ["\n\n" , "\n", " ", ""]
        )



    #read pdf , make their chunks and save it to vector databse
    def process_directory( self, data_path : str):

        #iterating through all files in the directory
        print(f"Starting ingestion from {data_path} .....")

        files = [f for f in os.listdir(data_path) if f.endswith(".pdf")]

        if not files:
            print("No PDF files found in the specified directory.")
            return

        documents = []
        metadatas = []
        ids = []

        total_chunks = 0


        for filename in files:
            file_path = os.path.join(data_path , filename)

            print(f"Processing file: {filename}")

            try:
                reader = PdfReader(file_path)
                full_text = ""
                for page in reader.pages:
                    text = page.extract_text()
                    if text:
                        full_text += text

                #making chunks
                chunks = self.text_splitter.split_text(full_text)


                #now storing in chroma databse
                for i , chunk in enumerate(chunks):
                    documents.append(chunk)
                    metadatas.append({
                        "source": filename
                    })
                    ids.append(f"{filename}_chunk_{i}")

                total_chunks += len(chunks)

            except Exception as e:
                print(f"Error processing file {filename}: {e}")


        #now inserting batch wise in chroma databse
        if documents:
            self.collection.upsert(
                documents = documents,
                metadatas = metadatas,
                ids = ids
            )
            print(f"Ingested files with total chunks : {total_chunks} and total files : {len(files)}")

        else:
            print("No documents to ingest.")


if __name__ == "__main__":
    data_path = "./data"
    ingestion_service = IngestionService()
    ingestion_service.process_directory(data_path)