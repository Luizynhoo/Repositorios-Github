import React, { useState, useCallback, useEffect, use } from "react";
import { FaGithub, FaPlus, FaSpinner, FaLink, FaTrash } from "react-icons/fa"
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { Link } from "react-router-dom";

import { getRepository } from "../../services/githubService";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Main() {

    const [NewRepository, setNewRepository] = useState('');
    const [Repository, setRepository] = useLocalStorage('repositories', []);
    const [Loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setAlert(null);

            //verifica se o repositorio ja existe
            const hasRepo = Repository.find(
                (repository) => repository.name.toLowerCase() === NewRepository.toLowerCase()
            );
            if (hasRepo) {
                throw new Error("Repositório duplicado");
            }

            //Busca o repositorio na api
            const data = await getRepository(NewRepository);

            //adiciona o novo repositorio na lista
            setRepository([...Repository, data]);
            setNewRepository('');

        } catch (error) {
            setAlert(true);
            console.log(error.message);

        } finally {
            setLoading(false);
        }


    }, [NewRepository, Repository]);

    function handleinputChange(e) {
        setNewRepository(e.target.value);
        setAlert(null);
    }

    const handleDelete = useCallback((repo) => {
        const find = Repository.filter(r => r.name !== repo);
        setRepository(find);
    }, [Repository])


    return (
        <Container>
            <h1>
                <FaGithub size={45} />
                Meus Repositorios
            </h1>


            <Form onSubmit={handleSubmit} error={alert} >
                <input
                    type="text"
                    placeholder="Adicionar Repositorio"
                    value={NewRepository}
                    onChange={handleinputChange}
                />

                <SubmitButton Loading={Loading ? 1 : 0}>
                    {
                        Loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )
                    }
                </SubmitButton>
            </Form>

            <List>
                {Repository.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14} />
                            </DeleteButton>

                            {repo.name}
                        </span>
                        {/* falando para url que o item é um parametro e não uma nova pasta */}
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaLink size={20} />
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    )
}