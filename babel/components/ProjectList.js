function ProjectList(props) {
  const projects = assembleList(props.projects);
  return /*#__PURE__*/React.createElement("div", {
    className: "project-list"
  }, projects.map(proj => /*#__PURE__*/React.createElement("div", {
    onClick: () => props.onConfirm(proj.id),
    key: proj.id,
    className: "project"
  }, /*#__PURE__*/React.createElement("p", null, proj.name))));
}

export default ProjectList;

function assembleList(projects) {
  return [...projects, {
    id: 0,
    name: "New Shopping List"
  }];
}