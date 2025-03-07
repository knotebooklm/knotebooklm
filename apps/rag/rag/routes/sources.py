from flask import Blueprint, request

bp = Blueprint('sources', __name__)

@bp.post('/text')
def embed_text():
    body = request.get_json()
    contents = body.get('contents')
    id = body.get('file_id')
    return { "status": 200, "message": f"processed file {id} with contents {contents}" }
