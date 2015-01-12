config =
  rsync:
    options:
      src: "app/"
      args: ["--verbose"]
      exclude: [".git*", "node_modules", ".sass-cache", "Gruntfile.js", "templates",
      "package.json", ".DS_Store", "README.md", ".jshintrc", "build-pipeline", 
      "gulpfile.js", "Gruntfile.coffee", "bower.json",
      ".bowerrc", "sass"]
      recursive: true
      syncDestIgnoreExcl: true
    staging:
      options:
        dest: ""
        host: ""

module.exports = (grunt) ->

  # load all grunt tasks matching the `grunt-*` pattern
  require("load-grunt-tasks") grunt

  grunt.initConfig config

  grunt.registerTask "deploy", [
    "rsync"
  ]
