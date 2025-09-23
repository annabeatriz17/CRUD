"use client";

import { useState } from "react";
import axios from "axios";

export default function Delete() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get(`http://jsonplaceholder.typicode.com/posts/${commentId}`);
            setComment(response.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const deleteComentario = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {
           await axios.delete(`http://jsonplaceholder.typicode.com/posts/${commentId}`);
           setSuccess(true);
           setComment(null);
           setCommentId("");
        } catch (error) {
           setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Deletar Comentario</h1>

        <div>

        <input
            type="number"
            value={commentId}
            onChange={(e) => setCommentId(e.target.value)}
            placeholder="ID do Comentario"
        />
        <button onClick={buscarComentario} disabled={!commentId || loading}>
            {loading ? "Buscando ..." : "Buscar"}
            </button>
            </div>

            {comment && (
                <div>
                    <h2>Comentário Encontrado: {comment.id}</h2>
                    <p>Nome: {comment.name}</p>
                    <p>Email: {comment.email}</p>
                    <p>Comentário: {comment.body}</p>

                    <button onClick={deleteComentario} disabled={loading}>
                        {loading ? "Deletando ..." : "Deletar"}
                    </button>
                    </div>
            )}

            {error && <p>Erro na operação de deletar</p>}
            {success && <p>Comentário deletado com sucesso</p>}
        </div>
    );
}