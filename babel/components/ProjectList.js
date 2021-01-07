function ProjectList(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "project-list"
  }, props.projects.map(p => /*#__PURE__*/React.createElement("div", {
    onClick: () => props.onConfirm(p.id),
    key: p.id,
    className: "project"
  }, /*#__PURE__*/React.createElement("p", null, p.name))));
}

export default ProjectList;