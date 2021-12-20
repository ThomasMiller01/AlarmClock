import { dark } from "./themes/dark";

class ColorsManager {
  static instance = null;

  static get() {
    if (ColorsManager.instance == null) {
      ColorsManager.instance = new ColorsManager();
    }

    return this.instance;
  }

  constructor(theme = "dark") {
    this.theme = theme;
  }

  colors = () => {
    return this.getColors();
  };

  getColors = () => {
    switch (this.theme) {
      case "Normal":
        return dark();
      case "Dark":
        return dark();
      case "Light":
        return dark();
      default:
        return dark();
    }
  };
}

export default ColorsManager;
