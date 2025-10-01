const byuiCourse = {
  code: "WDD 231",
  name: "Web Frontend Development",
  sections: [
    { section: 1, enrollment: 25 },
    { section: 2, enrollment: 30 },
    { section: 3, enrollment: 22 }
  ],
  changeEnrollment(sectionNum, add = true) {
    const section = this.sections.find(s => s.section == sectionNum);
    if (section) {
      section.enrollment += add ? 1 : -1;
    }
  }
};

export default byuiCourse;