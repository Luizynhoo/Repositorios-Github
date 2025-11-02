import api from "./api";

export async function getRepository(repoName) {
  try {
    const response = await api.get(`repos/${repoName}`);
    return {
      name: response.data.full_name,
    };
  } catch (error) {
    throw new Error("Repositório não encontrado.");
  }
}

export async function getRepositoryDetails(repoName, issuesPerPage = 5, page = 1, state="all") {
  try {
    const nomeRepo = decodeURIComponent(repoName);

    const [repositorioData, issuesData] = await Promise.all([
      api.get(`repos/${nomeRepo}`),
      api.get(`repos/${nomeRepo}/issues`, {
        params: {
          state,
          per_page: issuesPerPage,
          page: page,
        },
      }),
    ]);

    return {
      repository: repositorioData.data,
      issues: issuesData.data,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar dados do repositório.");
  }
}