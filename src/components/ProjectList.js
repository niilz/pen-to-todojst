function ProjectList(props) {
  return (
    <div className="project-list">
      {props.projects.map((p) => (
        <div
          onClick={() => props.onConfirm(p.id)}
          key={p.id}
          className="project"
        >
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}
export default ProjectList;
