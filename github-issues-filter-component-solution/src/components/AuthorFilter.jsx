import { useEffect, useState } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

const AuthorFilter = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contributors",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  return (
    <GithubFilter
      name="Author"
      header="Filter by author"
      placeholder="Filter authors"
      items={authors}
      renderItem={(author) => (
        <div className="flex gap-2 items-center">
          <img
            src={author.avatar_url}
            alt={author.login}
            className="w-4 h-4 rounded-lg border border-gray-300"
          />
          {author.login}
        </div>
      )}
      filterFn={(author, query) => author.login.match(new RegExp(query, "i"))}
    />
  );
};
export default AuthorFilter;
