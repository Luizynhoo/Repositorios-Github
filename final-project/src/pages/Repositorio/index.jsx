import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, Filter } from "./styles";
import { getRepositoryDetails } from "../../services/githubService";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";

export default function Repositorio() {
    const { repositorio } = useParams();
    const [page, setPage] = useState(1);
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function load() {
            try {
                const data = await getRepositoryDetails(repositorio, 5, page, filter);
                setRepository(data.repository);
                setIssues(data.issues);
                setLoading(false);

            } catch (error) {
                console.error(error);
            }
        }

        load();
    }, [repositorio, filter]);


    useEffect(() => {
        async function loadIssues() {
            try {
                const data = await getRepositoryDetails(repositorio, 5, page, filter);
                setIssues(data.issues);

            } catch (error) {
                console.error(error);
            }
        }

        loadIssues();

    }, [repositorio, filter, page]);

    function handlePage(action) {
        setPage(action === "back" && page > 1 ? page - 1 : page + 1);
    }

    if (loading) {
        return (
            <Loading loading={loading}>
                <FaSpinner color="#FFF" size={30} />
            </Loading>
        )
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#fff" size={30} />
            </BackButton>

            <Owner>
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />

                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>

            <Filter>
                <label htmlFor="issue-filter">Filtrar por:</label>
                <select
                    id="issue-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Todas</option>
                    <option value="open">Abertas</option>
                    <option value="closed">Fechadas</option>
                </select>
            </Filter>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img
                            src={issue.user.avatar_url}
                            alt={issue.user.login}
                        />

                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageActions>

                <button
                    type="button"
                    onClick={() => handlePage("back")}
                    disabled={page < 2}
                >
                    Voltar
                </button>

                <span>Página {page}</span>

                <button type="button" onClick={() => handlePage("next")}>
                    Proximo
                </button>

            </PageActions>

        </Container>
    )
}