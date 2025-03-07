from flask import Flask
from rag.routes.sources import bp as sources_bp


app = Flask(__name__)
app.register_blueprint(sources_bp)

def start():
    app.run(debug=True)
