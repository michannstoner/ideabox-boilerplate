class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.isStarred = false;
  };

  updateIdea(validateClick) {
    if (validateClick) {
    this.iSStarred = true;
    }
  };
};
 