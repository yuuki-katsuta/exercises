import { useEffect, useState } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

const LabelFilter = () => {
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    const fetchLabels = async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/labels",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setLabels(data);
    };
    fetchLabels();
  }, []);

  return (
    <GithubFilter
      name="Label"
      header="Filter by label"
      placeholder="Filter labels"
      items={labels}
      renderItem={(label) => (
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: `#${label.color}` }}
            className="w-4 h-4 rounded-lg border border-gray-300"
          ></div>
          {label.name}
        </div>
      )}
      filterFn={(label, query) => label.name.match(new RegExp(query, "i"))}
    />
  );
};

export default LabelFilter;
