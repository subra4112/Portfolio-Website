/**
 * One plain sentence per skill, written for someone who is not an ML engineer.
 * Shown in a popover when a bubble is clicked.
 */
export const SKILL_INFO: Record<string, string> = {
  // AI and Generative AI
  PyTorch: 'The framework I write models in. Every model I have trained from scratch lives here.',
  Transformers: 'The architecture behind modern AI. It reads a sequence and predicts what comes next, which is how ChatGPT and my clinical model both work.',
  LLMs: 'Large language models. Systems trained on enormous amounts of text that can read, write and reason.',
  'Fine Tuning': 'Taking a model that already knows language and teaching it one specific job, like spotting a drug side effect in a parent’s message.',
  'LoRA and QLoRA': 'A cheap way to fine tune. Instead of retraining billions of settings, you train a tiny add on, so it fits on one GPU.',
  RLHF: 'Training a model using human judgement about which answers are better, rather than just raw text.',
  Embeddings: 'Turning words into numbers so a computer can measure which ideas are close to each other.',
  'Hugging Face': 'The place the AI world shares models. I pull pretrained models from it and publish work back.',
  TensorFlow: 'The other major deep learning framework, from Google.',
  'Scikit learn': 'The classic toolkit for traditional machine learning, the models you reach for before deep learning.',
  'Computer Vision': 'Teaching software to understand images, from reading a screen to spotting objects.',
  CUDA: 'The layer that lets code run on NVIDIA GPUs. It is why training takes hours instead of months.',
  spaCy: 'A fast library for pulling structure out of written text.',

  // Agentic AI
  LangChain: 'A toolkit for wiring language models into real applications with memory, tools and data.',
  LangGraph: 'Lets you lay out an AI workflow as a graph, so an agent can loop, branch and recover instead of running once.',
  MCP: 'Model Context Protocol. A standard way to plug tools and data sources into an AI model safely.',
  'Agent Orchestration': 'Coordinating several AI agents so each does its part and they hand off cleanly.',
  'Tool Calling': 'Letting a model actually use software, call an API, query a database, rather than only talk.',
  'AI Agents': 'AI that plans and takes actions toward a goal instead of answering one question at a time.',
  'Persistent Memory': 'Giving an agent recall across sessions, so it remembers what happened last time.',

  // Retrieval and RAG
  'RAG Pipelines': 'Retrieval augmented generation. The model looks up real documents before answering, so it cites facts instead of inventing them.',
  'Hybrid Retrieval': 'Searching by meaning and by keyword at once, then merging the results. Each catches what the other misses.',
  Reranking: 'A second pass that reorders search results so the most useful one lands at the top.',
  'Vector Search': 'Finding things by similarity of meaning rather than exact words.',
  'Semantic Search': 'Search that understands intent, so asking a question in your own words still works.',
  LlamaIndex: 'A framework for connecting your own documents and databases to a language model.',
  'Prompt Engineering': 'Designing the instructions given to a model so it behaves reliably.',

  // MLOps and Cloud
  Docker: 'Packages software with everything it needs so it runs identically anywhere.',
  Kubernetes: 'Runs and scales those packages across many machines, and restarts them when they fail.',
  FastAPI: 'The Python framework I use to put a model behind an API other software can call.',
  MLflow: 'Tracks every training run, so you know exactly which settings produced which result.',
  'Weights and Biases': 'Live dashboards for model training, showing whether a run is learning or wasting GPU time.',
  vLLM: 'A serving engine that makes language models answer many users at once, fast and cheaply.',
  'AWS SageMaker': 'Amazon’s managed platform for training and hosting models in the cloud.',
  'CI and CD': 'Automation that tests and ships code every time it changes, so releases are routine.',
  'Model Monitoring': 'Watching a live model for drift, because the world changes after you deploy.',
  Linux: 'The operating system nearly all training and production servers run on.',
  Git: 'Version control. The full history of every change, and how teams work on one codebase.',

  // Databases and Vectors
  PostgreSQL: 'The relational database I reach for by default. Reliable and very capable.',
  Neo4j: 'A graph database. It stores relationships directly, so you can ask how two things connect.',
  ChromaDB: 'A lightweight database for embeddings, good for getting retrieval working quickly.',
  FAISS: 'Meta’s library for similarity search across millions of vectors at speed.',
  pgvector: 'Adds vector search to PostgreSQL, so one database handles both records and meaning.',
  Pinecone: 'A managed vector database for production scale semantic search.',
  Milvus: 'An open source vector database built for very large collections.',
  Weaviate: 'A vector database that also understands schemas and relationships.',
  MongoDB: 'A document database for data that does not fit neat columns.',
  MySQL: 'A widely used relational database.',

  // Data Engineering
  PySpark: 'Processes datasets too large for one machine by spreading the work across a cluster.',
  Kafka: 'Moves streams of events between systems in real time.',
  Airflow: 'Schedules data pipelines and shows you exactly which step failed and why.',
  'ETL Pipelines': 'Extract, transform, load. Getting messy source data into a clean, usable shape.',
  Databricks: 'A platform that brings large scale data processing and machine learning together.',
  Snowflake: 'A cloud data warehouse built for querying huge amounts of data quickly.',
  Redshift: 'Amazon’s data warehouse.',
  Grafana: 'Dashboards for metrics, so you can see a system’s health at a glance.',

  // Languages
  Python: 'The language nearly all of my AI and data work is written in.',
  SQL: 'How you ask a database questions. Fundamental to any data role.',
  'C++': 'A fast, low level language. Useful when performance really matters.',
  TypeScript: 'JavaScript with types. What I build interfaces in, including this site.',
  Java: 'A large, strongly typed language common in enterprise backends.',
  R: 'A language built for statistics and data analysis.',
}
