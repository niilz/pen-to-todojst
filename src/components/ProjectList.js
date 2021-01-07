function ProjectList(props) {
  const projects = assembleList(props.projects);
  return (
    <div className="project-list">
      {projects.map((proj) => (
        <div
          onClick={() => props.onConfirm(proj.id)}
          key={proj.id}
          className="project"
        >
          <p>{proj.name}</p>
        </div>
      ))}
    </div>
  );
}
export default ProjectList;

function assembleList(projects) {
  return [...projects, { id: 0, name: "New Shopping List" }];
}
