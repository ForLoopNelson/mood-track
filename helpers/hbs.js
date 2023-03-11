const moment = require("moment")

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format)
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + " "
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(" "))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + "..."
    }
    return str
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "")
  },
  editIcon: function (storyUser, loggedUser, storyId, floating = true) {
    if (storyUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
      } else {
        return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
      }
    } else {
      return ""
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      )
  },

  // Mood Color helper
  colorClass: function (colorValue) {
    let className = ""
    switch (colorValue) {
      case "neutral":
        className = "blue lighten-1"
        break
      case "good":
        className = "green lighten-1"
        break
      case "bad":
        className = "red"
        break
      default:
        // Check if the colorValue is a valid hex color value
        if (/^#[0-9A-F]{6}$/i.test(colorValue)) {
          className = colorValue
        } else {
          className = "rgba(245,242,242,0.5)"
        }
        break
    }
    return className
  },
}
